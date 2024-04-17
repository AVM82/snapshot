package com.project.snapshotspringboot.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class SkillTreeDTO {
    List<SkillDTO> skills;
}
