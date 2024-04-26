package com.project.snapshotspringboot.controller;

import com.project.snapshotspringboot.dtos.InterviewResultsDto;
import com.project.snapshotspringboot.dtos.QuestionScoreDto;
import com.project.snapshotspringboot.dtos.interview.InterviewCreationDto;
import com.project.snapshotspringboot.dtos.interview.InterviewDto;
import com.project.snapshotspringboot.dtos.interviewer.InterviewQuestionDto;
import com.project.snapshotspringboot.dtos.interviewer.InterviewerQuestionRequestDto;
import com.project.snapshotspringboot.dtos.interviewer.InterviewerQuestionResponseDto;
import com.project.snapshotspringboot.security.oauth2.model.AuthDetails;
import com.project.snapshotspringboot.service.InterviewService;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/interviews")
@Tag(name = "Interviews", description = "Interview management endpoints!")
@SecurityRequirement(name = "jwt")
@ApiResponse(responseCode = "401", content = {@Content})
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE)
public class InterviewController {

    final InterviewService interviewService;

    @GetMapping("/{interviewId}/results")
    public InterviewResultsDto getInterviewResults(@PathVariable Long interviewId) {
        return interviewService.getInterviewResults(interviewId);
    }

    @PostMapping
    public InterviewDto createInterview(@AuthenticationPrincipal AuthDetails authDetails,
                                        @RequestBody @Valid InterviewCreationDto interviewDto) {
        return interviewService.createInterview(authDetails, interviewDto);
    }

    @PostMapping("/question")
    public InterviewerQuestionResponseDto saveQuestion(@AuthenticationPrincipal AuthDetails authDetails,
                                                       @RequestBody @Valid InterviewerQuestionRequestDto questionRequestDto) {
        return interviewService.saveQuestion(authDetails, questionRequestDto);
    }

    @PostMapping("/question/grade")
    public QuestionScoreDto evaluateQuestion(@AuthenticationPrincipal AuthDetails authDetails,
                                             @RequestBody @Valid InterviewQuestionDto questionDto) {
        return interviewService.evaluateQuestion(authDetails, questionDto);
    }
}
