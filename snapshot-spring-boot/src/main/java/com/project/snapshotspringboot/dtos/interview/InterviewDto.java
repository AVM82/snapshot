package com.project.snapshotspringboot.dtos.interview;

import com.project.snapshotspringboot.dtos.UserResponseDto;
import com.project.snapshotspringboot.enumeration.InterviewStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
public class InterviewDto {
    private Long id;
    private String title;
    private InterviewStatus status;
    private UserResponseDto interviewer;
    private UserResponseDto searcher;
    private LocalDateTime plannedDateTime;
    private LocalDateTime startDateTime;
    private LocalDateTime endDateTime;
    private String feedback;
//    private List<InterviewQuestionDto> questions;
}
