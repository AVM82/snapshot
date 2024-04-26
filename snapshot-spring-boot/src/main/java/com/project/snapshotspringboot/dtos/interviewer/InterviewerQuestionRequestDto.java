package com.project.snapshotspringboot.dtos.interviewer;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class InterviewerQuestionRequestDto {

    @NotNull
    private Long interviewId;

    @NotNull
    private Long interviewerId;

    @NotNull
    private Long skillId;

    @NotNull
    @NotBlank
    private String question;

}
