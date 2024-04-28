package com.project.snapshotspringboot.service;

import com.project.snapshotspringboot.dtos.InterviewResultsDto;
import com.project.snapshotspringboot.dtos.QuestionScoreDto;
import com.project.snapshotspringboot.dtos.interview.InterviewCreationDto;
import com.project.snapshotspringboot.dtos.interview.InterviewDto;
import com.project.snapshotspringboot.dtos.interview.InterviewUpdateDto;
import com.project.snapshotspringboot.dtos.interview.ShortInterviewDto;
import com.project.snapshotspringboot.dtos.interviewer.InterviewQuestionRequestDto;
import com.project.snapshotspringboot.dtos.interviewer.InterviewQuestionResponseDto;
import com.project.snapshotspringboot.dtos.interviewer.InterviewerQuestionRequestDto;
import com.project.snapshotspringboot.dtos.interviewer.InterviewerQuestionResponseDto;
import com.project.snapshotspringboot.entity.*;
import com.project.snapshotspringboot.enumeration.InterviewStatus;
import com.project.snapshotspringboot.mapper.InterviewMapper;
import com.project.snapshotspringboot.mapper.InterviewQuestionMapper;
import com.project.snapshotspringboot.mapper.InterviewerQuestionMapper;
import com.project.snapshotspringboot.mapper.SkillMapper;
import com.project.snapshotspringboot.repository.InterviewQuestionRepository;
import com.project.snapshotspringboot.repository.InterviewRepository;
import com.project.snapshotspringboot.repository.InterviewerQuestionRepository;
import com.project.snapshotspringboot.repository.SkillRepository;
import com.project.snapshotspringboot.security.oauth2.model.AuthDetails;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE)
public class InterviewService {

    final InterviewRepository interviewRepository;
    final InterviewQuestionRepository interviewQuestionRepository;
    final InterviewerQuestionRepository interviewerQuestionRepository;
    final SkillRepository skillRepository;
    final UserService userService;
    final UserDetailsService userDetailsService;
    final InterviewMapper interviewMapper;
    final InterviewerQuestionMapper interviewerQuestionMapper;
    final SkillMapper skillMapper;
    final InterviewQuestionMapper interviewQuestionMapper;

    public InterviewResultsDto getInterviewResults(Long interviewId) {
        Optional<InterviewEntity> optionalInterviewEntity = interviewRepository.findById(interviewId);
        if (optionalInterviewEntity.isPresent()) {
            InterviewEntity interviewEntity = optionalInterviewEntity.get();
            List<InterviewQuestionEntity> questions = interviewQuestionRepository.findByInterviewId(interviewId);
            String feedback = interviewEntity.getFeedback();

            List<QuestionScoreDto> questionScores = questions.stream().map(question ->
                            new QuestionScoreDto(question.getId(), question.getQuestion(), question.getGrade() + "%", question.getSkill().getName()))
                    .toList();
            return new InterviewResultsDto(questionScores, feedback);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Interview not found");
        }
    }

    public InterviewDto createInterview(AuthDetails authDetails, InterviewCreationDto interviewCreationDto) {
        InterviewEntity interviewEntity = interviewMapper.toEntity(interviewCreationDto);
        interviewEntity.setInterviewer(authDetails.getUserEntity());
        interviewEntity.setSearcher(userService.findById(interviewCreationDto.getSearcherId()));
        InterviewEntity savedInterview = interviewRepository.save(interviewEntity);
        return interviewMapper.toDto(savedInterview);
    }

    public List<ShortInterviewDto> getInterviewList(AuthDetails authDetails) {
        UserEntity currentUser = authDetails.getUserEntity();
        List<InterviewEntity> interviews = interviewRepository
                .findByInterviewer_IdOrSearcher_Id(currentUser.getId(), currentUser.getId());
        return interviews.stream().map(interviewMapper::toShortDto).toList();
    }

    public InterviewDto updateInterview(Long interviewId, InterviewUpdateDto interviewDto) {
        Optional<InterviewEntity> optionalInterviewEntity = interviewRepository.findById(interviewId);
        if (optionalInterviewEntity.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Interview not found");
        }
        InterviewEntity interviewEntity = optionalInterviewEntity.get();
        interviewEntity.setTitle(interviewDto.getTitle());
        interviewEntity.setPlannedDateTime(interviewDto.getPlannedDateTime());
        InterviewEntity savedInterview = interviewRepository.save(interviewEntity);
        return interviewMapper.toDto(savedInterview);
    }

    public InterviewDto updateInterviewStatus(Long interviewId, InterviewStatus status) {
        Optional<InterviewEntity> optionalInterviewEntity = interviewRepository.findById(interviewId);
        if (optionalInterviewEntity.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Interview not found");
        }
        InterviewEntity interviewEntity = optionalInterviewEntity.get();
        InterviewStatus.validateStatusTransition(interviewEntity.getStatus(), status);
        log.debug("Interview id = {} status updated from {} to {}", interviewId, interviewEntity.getStatus(), status);
        interviewEntity.setStatus(status);
        return interviewMapper.toDto(interviewRepository.save(interviewEntity));
    }


    public InterviewerQuestionResponseDto saveQuestion(AuthDetails authDetails, InterviewerQuestionRequestDto questionDto) {
        extractedUserAndCheckRole(authDetails);

        Long skillId = questionDto.getSkillId();
        SkillEntity skillEntity = getSkillEntity(skillId);
        String questionText = questionDto.getQuestion();

        if (interviewerQuestionRepository.existsBySkillIdAndQuestion(skillId, questionText)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Question already exists.");
        }

        InterviewerQuestionEntity entity = interviewerQuestionMapper.toEntity(questionDto);
        entity.setSkill(skillEntity);
        InterviewerQuestionEntity savedEntity = interviewerQuestionRepository.save(entity);
        InterviewQuestionEntity interviewQuestionEntity = interviewQuestionMapper.toEntity(questionDto);
        interviewQuestionEntity.setSkill(skillEntity);
        InterviewQuestionEntity savedInterviewQuestionEntity = interviewQuestionRepository.save(interviewQuestionEntity);

        if (savedEntity.getId() == null || savedInterviewQuestionEntity.getId() == null) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to save question.");
        } else {

            log.info("Question saved successfully. Id: {}, Skill: {}", savedEntity.getId(), skillEntity.getName());

            return InterviewerQuestionResponseDto.builder()
                    .id(savedEntity.getId())
                    .skillName(skillMapper.toDto(skillEntity).getName())
                    .question(questionDto.getQuestion())
                    .build();
        }
    }

    public void extractedUserAndCheckRole(AuthDetails authDetails) {
        String username = authDetails.getUsername();
        UserDetails userDetails = userDetailsService.loadUserByUsername(username);
        if (!userHasRole(userDetails)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Only interviewers can save questions/(graded question).");
        }
    }

    public boolean userHasRole(UserDetails userDetails) {
        return userDetails.getAuthorities().stream()
                .anyMatch(authority -> authority.getAuthority().equals("INTERVIEWER"));
    }

    public SkillEntity getSkillEntity(Long skillId) {
        return skillRepository.findById(skillId).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "Skill not found with id: " + skillId));
    }

    @Transactional(rollbackFor = {Exception.class})
    public InterviewQuestionResponseDto evaluateQuestion(AuthDetails authDetails, InterviewQuestionRequestDto interviewQuestionDto) {
        extractedUserAndCheckRole(authDetails);

        InterviewQuestionEntity interviewQuestionEntity = interviewQuestionRepository.findById(interviewQuestionDto.getId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Question not found."));
        String grade = interviewQuestionDto.getGrade();
        interviewQuestionEntity.setGrade(Integer.parseInt(grade));

        InterviewQuestionEntity savedEntity = interviewQuestionRepository.save(interviewQuestionEntity);
        if (savedEntity.getId() == null) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to save question grade.");
        } else {
            log.info("The grade was saved successfully. Id: {}", savedEntity.getId());
            return InterviewQuestionResponseDto.builder()
                    .id(savedEntity.getId())
                    .grade(grade + "%")
                    .build();
        }
    }

    public List<InterviewerQuestionResponseDto> getMyQuestionsBySkillId(AuthDetails authDetails,
                                                                        long id) {
        return interviewerQuestionRepository
                .findAllByInterviewerIdAndSkillId(authDetails.getUserEntity().getId(), id)
                .stream()
                .map(interviewerQuestionMapper::toResponseDto)
                .toList();
    }
}
