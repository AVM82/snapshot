package com.project.snapshotspringboot.dtos;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserSkillSearchRequestDto {

    String skillName;
    String skillGrade;

}
