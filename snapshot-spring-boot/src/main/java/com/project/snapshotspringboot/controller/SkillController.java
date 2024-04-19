package com.project.snapshotspringboot.controller;

import com.project.snapshotspringboot.dtos.SkillTreeDTO;
import com.project.snapshotspringboot.service.SkillService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/skills")
@RequiredArgsConstructor
@Slf4j
public class SkillController {
    private final SkillService skillService;

    @GetMapping("/tree/{rootId}")
    public List<SkillTreeDTO> getSkillTree(@PathVariable Long rootId) {
        return skillService.getSkillTree(rootId);
    }

    @GetMapping("/toplevel/{rootId}")
    public List<SkillTreeDTO> getTopLevelSkills(@PathVariable Long rootId) {
        return skillService.getTopLevelSkills(rootId);
    }
}
