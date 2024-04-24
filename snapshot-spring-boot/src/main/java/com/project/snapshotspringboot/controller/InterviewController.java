package com.project.snapshotspringboot.controller;

import com.project.snapshotspringboot.dtos.InterviewResultsDTO;
import com.project.snapshotspringboot.service.InterviewService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/interviews")
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE)
public class InterviewController {

    final InterviewService interviewService;

    @GetMapping("/{interviewId}/results")
    public InterviewResultsDTO getInterviewResults(@PathVariable Long interviewId) {
        return interviewService.getInterviewResults(interviewId);
    }
}
