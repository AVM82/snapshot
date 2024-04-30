package com.project.snapshotspringboot.service;

import com.project.snapshotspringboot.dtos.InterviewResultsDto;
import com.project.snapshotspringboot.dtos.QuestionScoreDto;
import com.project.snapshotspringboot.dtos.interview.*;
import com.project.snapshotspringboot.dtos.question.InterviewQuestionGradeRequestDto;
import com.project.snapshotspringboot.dtos.question.InterviewQuestionGradeResponseDto;
import com.project.snapshotspringboot.dtos.question.InterviewQuestionRequestDto;
import com.project.snapshotspringboot.dtos.question.InterviewQuestionResponseDto;
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

import java.time.LocalDateTime;
import java.time.ZoneId;
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

            List<QuestionScoreDto> questionScores = interviewQuestionMapper.toScoreDtoList(questions);
            return new InterviewResultsDto(questionScores, feedback);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Interview not found");
        }
    }

    public InterviewFullDto getInterviewById(Long interviewId) {
        Optional<InterviewEntity> interviewEntity = interviewRepository.findById(interviewId);
        if (interviewEntity.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Interview not found");
        }
        List<InterviewQuestionEntity> questions = interviewQuestionRepository.findByInterviewId(interviewId);
        List<QuestionScoreDto> questionScores = interviewQuestionMapper.toScoreDtoList(questions);
        return interviewMapper.toFullDto(interviewEntity.get(), questionScores);
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

    @Transactional(rollbackFor = Exception.class)
    public InterviewQuestionResponseDto saveQuestion(AuthDetails authDetails, InterviewQuestionRequestDto questionDto) {
        extractedUserAndCheckRole(authDetails);
        InterviewEntity interviewEntity = getInterviewEntity(questionDto);
        if (!interviewEntity.getInterviewer().getId().equals(questionDto.getInterviewerId())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "The interviewer Id for the interview does not match the interviewer Id provided in the request");
        }
        Long interviewId = questionDto.getInterviewId();
        Long skillId = questionDto.getSkillId();
        SkillEntity skillEntity = getSkillEntity(skillId);
        String questionText = questionDto.getQuestion();

        InterviewQuestionEntity interviewQuestionEntity = interviewQuestionMapper.toEntity(questionDto);
        interviewQuestionEntity.setCreateAt(LocalDateTime.now(ZoneId.of("UTC")));
        interviewQuestionEntity.setSkill(skillEntity);

        InterviewerQuestionEntity interviewerQuestionEntity = interviewerQuestionMapper.toEntity(questionDto);
        interviewerQuestionEntity.setSkill(skillEntity);

        InterviewerQuestionEntity savedInterviewerQuestion;
        InterviewQuestionEntity savedInterviewQuestion;
        if (interviewerQuestionRepository.existsBySkillIdAndQuestion(skillId, questionText) &&
                !interviewQuestionRepository.existsByInterviewIdAndSkillIdAndQuestion(interviewId, skillId, questionText)) {
            log.info("Question already exists.");
            log.warn("Such a question is already in the interviewer's list of questions, " +
                    "the question will be added only to the current interview");
            savedInterviewerQuestion = getInterviewerQuestionEntity(skillId, questionText);
            savedInterviewQuestion = interviewQuestionRepository.save(interviewQuestionEntity);
        } else if (interviewQuestionRepository.existsByInterviewIdAndSkillIdAndQuestion(interviewId, skillId, questionText)) {
            log.info("Question already exists.");
            savedInterviewerQuestion = getInterviewerQuestionEntity(skillId, questionText);
            savedInterviewQuestion = getInterviewQuestionEntity(interviewId, skillId, questionText);
        } else {
            savedInterviewerQuestion = interviewerQuestionRepository.save(interviewerQuestionEntity);
            savedInterviewQuestion = interviewQuestionRepository.save(interviewQuestionEntity);
        }
        log.info("The question has been successfully saved (or it already exists) in the interviewer's question database. Id: {}, Skill: {}", savedInterviewerQuestion.getId(), skillEntity.getName());
        log.info("The question has been successfully saved (or it already exists) in the database of interview questions. Id: {}, Skill: {}", savedInterviewQuestion.getId(), skillEntity.getName());
        return InterviewQuestionResponseDto.builder()
                .id(savedInterviewQuestion.getId())
                .skillName(skillEntity.getName())
                .question(questionDto.getQuestion())
                .createdAt(savedInterviewQuestion.getCreateAt())
                .build();
    }

    public InterviewEntity getInterviewEntity(InterviewQuestionRequestDto questionDto) {
        return interviewRepository.findById(questionDto.getInterviewId()).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "Interview not found with Id: " + questionDto.getInterviewId()));
    }

    public InterviewQuestionEntity getInterviewQuestionEntity(Long interviewId, Long skillId, String questionText) {
        return interviewQuestionRepository.findByInterviewIdAndSkillIdAndQuestion(interviewId, skillId, questionText).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "Question not fount with skill Id: " + skillId + ", question text: " + questionText));
    }

    public InterviewerQuestionEntity getInterviewerQuestionEntity(Long skillId, String questionText) {
        return interviewerQuestionRepository.findBySkillIdAndQuestion(skillId, questionText).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "Question not fount with skill Id: " + skillId + ", question text: " + questionText));
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
    public InterviewQuestionGradeResponseDto evaluateQuestion(AuthDetails authDetails, InterviewQuestionGradeRequestDto interviewQuestionDto) {
        extractedUserAndCheckRole(authDetails);

        interviewRepository.findById(interviewQuestionDto.getInterviewId()).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "Interview not found with Id: " + interviewQuestionDto.getInterviewId()));

        InterviewQuestionEntity interviewQuestionEntity = interviewQuestionRepository.findById(interviewQuestionDto.getId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Question not found."));

        if (!interviewQuestionDto.getInterviewId().equals(interviewQuestionEntity.getInterviewId())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "The interview Id for question Id does not match the interview Id provided in the request");
        }
        String grade = interviewQuestionDto.getGrade();
        String gradeWithoutPercentage = grade.replaceAll("[^\\d.]", "");

        interviewQuestionEntity.setGrade(Integer.parseInt(gradeWithoutPercentage));
        InterviewQuestionEntity savedEntity = interviewQuestionRepository.save(interviewQuestionEntity);
        if (savedEntity.getId() == null) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to save question grade.");
        } else {
            log.info("The grade was saved successfully. Id: {}", savedEntity.getId());
            return InterviewQuestionGradeResponseDto.builder()
                    .id(savedEntity.getId())
                    .grade(grade)
                    .build();
        }
    }

    public List<InterviewQuestionResponseDto> getMyQuestionsBySkillId(AuthDetails authDetails,
                                                                      long id) {
        return interviewerQuestionRepository
                .findAllByInterviewerIdAndSkillId(authDetails.getUserEntity().getId(), id)
                .stream()
                .map(interviewerQuestionMapper::toResponseDto)
                .toList();
    }

    public String updateFeedback(Long interviewId, String feedback) {
        Optional<InterviewEntity> optionalInterviewEntity = interviewRepository.findById(interviewId);
        if (optionalInterviewEntity.isPresent()) {
            InterviewEntity interviewEntity = optionalInterviewEntity.get();
            interviewEntity.setFeedback(feedback);
            interviewRepository.save(interviewEntity);
            return interviewEntity.getFeedback();
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Interview not found");
        }
    }
}
