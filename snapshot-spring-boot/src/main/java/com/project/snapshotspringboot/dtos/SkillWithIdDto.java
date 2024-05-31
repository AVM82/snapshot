package com.project.snapshotspringboot.dtos;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SkillWithIdDto {
    private Long id;
    private String name;
}
