package com.project.snapshotspringboot.dtos.question;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InterviewQuestionGradeResponseDto {
    private Long id;
    private String grade;
}
