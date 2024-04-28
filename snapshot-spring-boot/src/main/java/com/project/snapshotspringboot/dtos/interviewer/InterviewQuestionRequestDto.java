package com.project.snapshotspringboot.dtos.interviewer;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InterviewQuestionRequestDto {

    @NotNull(message = "Question ID is required.")
    private Long id;

    @NotNull(message = "Interview ID is required.")
    private Long interviewId;

    @NotNull(message = "Grade is required.")
    @NotBlank(message = "An estimate must be issued.")
    private String grade;
}
