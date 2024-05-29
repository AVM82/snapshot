package com.project.snapshotspringboot.dtos.search;

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
public class SearchSkillGradeDto {
    @NotNull
    @NotBlank
    private String skill;
    @NotNull
    private Integer grade;
}
