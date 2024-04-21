package com.project.snapshotspringboot.dtos;

import lombok.Data;

import java.util.List;

@Data
public class SkillTreeDto {
    private Long id;
    private String name;
    private List<SkillTreeDto> children;
}
