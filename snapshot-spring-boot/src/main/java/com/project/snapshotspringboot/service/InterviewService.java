package com.project.snapshotspringboot.service;

import com.project.snapshotspringboot.dtos.InterviewResultsDTO;
import com.project.snapshotspringboot.dtos.QuestionScoreDTO;
import com.project.snapshotspringboot.dtos.interview.InterviewCreationDto;
import com.project.snapshotspringboot.dtos.interview.InterviewDto;
import com.project.snapshotspringboot.entity.InterviewEntity;
import com.project.snapshotspringboot.entity.InterviewQuestionEntity;
import com.project.snapshotspringboot.mapper.InterviewMapper;
import com.project.snapshotspringboot.repository.InterviewQuestionRepository;
import com.project.snapshotspringboot.repository.InterviewRepository;
import com.project.snapshotspringboot.security.oauth2.model.AuthDetails;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
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
    final UserService userService;
    final InterviewMapper interviewMapper;

    public InterviewResultsDTO getInterviewResults(Long interviewId) {
        Optional<InterviewEntity> optionalInterviewEntity = interviewRepository.findById(interviewId);
        if (optionalInterviewEntity.isPresent()) {
            InterviewEntity interviewEntity = optionalInterviewEntity.get();
            List<InterviewQuestionEntity> questions = interviewQuestionRepository.findByInterviewId(interviewId);
            String feedback = interviewEntity.getFeedback();

            List<QuestionScoreDTO> questionScores = questions.stream().map(question ->
                            new QuestionScoreDTO(question.getQuestion(), question.getGrade() + "%")).toList();
            return new InterviewResultsDTO(questionScores, feedback);
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
}
