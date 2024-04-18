package com.project.snapshotspringboot.dtos;

import lombok.Data;

import java.util.List;

@Data
public class SkillTreeDTO {
    private Long id;
    private String name;
    private List<SkillTreeDTO> children;
}
