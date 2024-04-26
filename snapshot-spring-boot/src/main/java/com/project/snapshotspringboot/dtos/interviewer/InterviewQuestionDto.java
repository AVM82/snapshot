package com.project.snapshotspringboot.dtos.interviewer;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InterviewQuestionDto {
    private Long id;
    private Long interviewId;
    private Long skillId;
    private String question;
    private Integer grade;
}
