package com.project.snapshotspringboot.dtos;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class QuestionScoreDto {
    Long id;
    String question;
    String grade;
    String skillName;
}
