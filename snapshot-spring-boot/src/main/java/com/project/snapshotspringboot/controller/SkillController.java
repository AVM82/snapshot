package com.project.snapshotspringboot.controller;

import com.project.snapshotspringboot.dtos.SkillTreeDto;
import com.project.snapshotspringboot.dtos.UserSkillAddDto;
import com.project.snapshotspringboot.security.oauth2.model.AuthDetails;
import com.project.snapshotspringboot.service.SkillService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/skills")
@RequiredArgsConstructor
@Slf4j
public class SkillController {
    private final SkillService skillService;

    @GetMapping("/tree/{rootId}")
    public List<SkillTreeDto> getSkillTree(@PathVariable Long rootId) {
        return skillService.getSkillTree(rootId);
    }

    @GetMapping("/toplevel/{rootId}")
    public List<SkillTreeDto> getTopLevelSkills(@PathVariable Long rootId) {
        return skillService.getTopLevelSkills(rootId);
    }

    @PostMapping("/user")
    public void addUserSkills(@AuthenticationPrincipal AuthDetails authDetails,
                              @RequestBody UserSkillAddDto skillDto) {
        skillService.addUserSkills(authDetails, skillDto);
    }
}
