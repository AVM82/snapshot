package com.project.snapshotspringboot.dtos;

import lombok.Data;

import java.util.List;


@Data
public class UserSkillAddDto {
    private Long roleId;
    private List<Long> skillIds;
}
