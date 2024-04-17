package com.project.snapshotspringboot.dto;

import lombok.Data;

import java.util.List;

@Data
public class SkillDTO {
    private Long id;
    private String name;
    private List<SkillDTO> children;
}
