package com.project.snapshotspringboot.dtos;

import lombok.Data;

import java.util.List;


@Data
public class UserSkillAddDto {
    private List<Long> skillIds;
}
