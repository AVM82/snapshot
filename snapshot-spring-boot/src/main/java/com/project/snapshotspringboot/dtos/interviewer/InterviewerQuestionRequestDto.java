package com.project.snapshotspringboot.dtos.interviewer;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class InterviewerQuestionRequestDto {

    private Long interviewId;
    private Long interviewerId;
    private Long skillId;
    private String question;

}
