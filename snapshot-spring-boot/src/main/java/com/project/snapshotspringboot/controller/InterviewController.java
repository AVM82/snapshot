package com.project.snapshotspringboot.controller;

import com.project.snapshotspringboot.dtos.InterviewResultsDto;
import com.project.snapshotspringboot.dtos.interview.InterviewCreationDto;
import com.project.snapshotspringboot.dtos.interview.InterviewDto;
import com.project.snapshotspringboot.dtos.interviewer.InterviewerQuestionRequestDto;
import com.project.snapshotspringboot.dtos.interviewer.InterviewerQuestionResponseDto;
import com.project.snapshotspringboot.security.oauth2.model.AuthDetails;
import com.project.snapshotspringboot.service.InterviewService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/interviews")
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
    public InterviewerQuestionResponseDto saveQuestion(@RequestBody InterviewerQuestionRequestDto questionRequestDto,
                                                       Principal principal) {
        return interviewService.saveQuestion(questionRequestDto, principal);
    }
}
