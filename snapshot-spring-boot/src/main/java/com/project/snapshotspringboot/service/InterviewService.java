package com.project.snapshotspringboot.service;

import com.project.snapshotspringboot.dtos.InterviewResultsDto;
import com.project.snapshotspringboot.dtos.QuestionScoreDto;
import com.project.snapshotspringboot.dtos.interview.InterviewCreationDto;
import com.project.snapshotspringboot.dtos.interview.InterviewDto;
import com.project.snapshotspringboot.dtos.interviewer.InterviewerQuestionRequestDto;
import com.project.snapshotspringboot.dtos.interviewer.InterviewerQuestionResponseDto;
import com.project.snapshotspringboot.entity.InterviewEntity;
import com.project.snapshotspringboot.entity.InterviewQuestionEntity;
import com.project.snapshotspringboot.entity.InterviewerQuestionEntity;
import com.project.snapshotspringboot.entity.SkillEntity;
import com.project.snapshotspringboot.mapper.InterviewMapper;
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

import java.security.Principal;
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

    public InterviewResultsDto getInterviewResults(Long interviewId) {
        Optional<InterviewEntity> optionalInterviewEntity = interviewRepository.findById(interviewId);
        if (optionalInterviewEntity.isPresent()) {
            InterviewEntity interviewEntity = optionalInterviewEntity.get();
            List<InterviewQuestionEntity> questions = interviewQuestionRepository.findByInterviewId(interviewId);
            String feedback = interviewEntity.getFeedback();

            List<QuestionScoreDto> questionScores = questions.stream().map(question ->
                    new QuestionScoreDto(question.getQuestion(), question.getGrade() + "%", question.getSkill().getName()))
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

    public InterviewerQuestionResponseDto saveQuestion(InterviewerQuestionRequestDto questionDto, Principal principal) {
        String username = principal.getName();
        UserDetails userDetails = userDetailsService.loadUserByUsername(username);
        if (!userHasRole(userDetails)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Only interviewers can save questions.");
        }
        Long skillId = questionDto.getSkillId();
        SkillEntity skillEntity = skillRepository.findById(skillId).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "Skill not found with id: " + skillId));
        InterviewerQuestionEntity entity = interviewerQuestionMapper.toEntity(questionDto);
        entity.setSkill(skillEntity);
        InterviewerQuestionEntity savedEntity = interviewerQuestionRepository.save(entity);

        log.info("Question saved successfully.");

        return InterviewerQuestionResponseDto.builder()
                .id(savedEntity.getId())
                .skillName(skillMapper.toDto(skillEntity).getName())
                .question(questionDto.getQuestion())
                .build();

    }

    private boolean userHasRole(UserDetails userDetails) {
        return userDetails.getAuthorities().stream()
                .anyMatch(authority -> authority.getAuthority().equals("INTERVIEWER"));
    }
}
