package com.project.snapshotspringboot.controller;

import com.project.snapshotspringboot.dto.SkillTreeDTO;
import com.project.snapshotspringboot.entity.Skill;
import com.project.snapshotspringboot.services.SkillService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/skills")
@RequiredArgsConstructor
public class SkillController {
    private final SkillService skillService;

    @GetMapping("/{id}")
    public Skill getSkill(@PathVariable Long id) {
        return skillService.getSkills(id);
    }

    @GetMapping("/tree/{rootId}")
    public SkillTreeDTO getSkillTree(@PathVariable Long rootId) {
        return skillService.getSkillTree(rootId);
    }

}
