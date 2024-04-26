package com.project.snapshotspringboot.service;

import com.project.snapshotspringboot.dtos.InterviewResultsDto;
import com.project.snapshotspringboot.dtos.QuestionScoreDto;
import com.project.snapshotspringboot.dtos.interview.InterviewCreationDto;
import com.project.snapshotspringboot.dtos.interview.InterviewDto;
import com.project.snapshotspringboot.dtos.interviewer.InterviewQuestionDto;
import com.project.snapshotspringboot.dtos.interviewer.InterviewerQuestionRequestDto;
import com.project.snapshotspringboot.dtos.interviewer.InterviewerQuestionResponseDto;
import com.project.snapshotspringboot.entity.InterviewEntity;
import com.project.snapshotspringboot.entity.InterviewQuestionEntity;
import com.project.snapshotspringboot.entity.InterviewerQuestionEntity;
import com.project.snapshotspringboot.entity.SkillEntity;
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

    private void extractedUserAndCheckRole(AuthDetails authDetails) {
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

    public QuestionScoreDto evaluateQuestion(AuthDetails authDetails, InterviewQuestionDto interviewQuestionDto) {
        extractedUserAndCheckRole(authDetails);

        Long interviewId = interviewQuestionDto.getInterviewId();
        if (interviewId == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Interview ID is required.");
        }

        SkillEntity skillEntity = getSkillEntity(interviewQuestionDto.getSkillId());
        if (skillEntity == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Skill ID is required.");
        }

        int grade = interviewQuestionDto.getGrade();

        InterviewQuestionEntity interviewQuestionEntity = interviewQuestionMapper.toEntity(interviewQuestionDto);
        interviewQuestionEntity.setGrade(grade);
        interviewQuestionEntity.setSkill(skillEntity);
        InterviewQuestionEntity savedEntity = interviewQuestionRepository.save(interviewQuestionEntity);
        if (savedEntity.getId() == null) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to save question grade.");
        } else {
            log.info("The grade was saved successfully. Id: {}", savedEntity.getId());
            return QuestionScoreDto.builder()
                    .id(savedEntity.getId())
                    .question(interviewQuestionDto.getQuestion())
                    .grade(grade + "%")
                    .skillName(skillEntity.getName())
                    .build();
        }
    }

}
