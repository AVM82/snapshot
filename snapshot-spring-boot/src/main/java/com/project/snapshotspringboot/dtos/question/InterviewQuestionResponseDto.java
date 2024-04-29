package com.project.snapshotspringboot.dtos.question;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class InterviewQuestionResponseDto {

    private Long id;
    private String skillName;
    private String question;

}
