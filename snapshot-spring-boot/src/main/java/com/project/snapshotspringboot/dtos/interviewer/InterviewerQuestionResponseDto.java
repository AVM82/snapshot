package com.project.snapshotspringboot.dtos.interviewer;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class InterviewerQuestionResponseDto {

    private Long id;
    private String skillName;
    private String question;

}
