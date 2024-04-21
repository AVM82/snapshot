package com.project.snapshotspringboot.controller;

import com.project.snapshotspringboot.dtos.SkillTreeDto;
import com.project.snapshotspringboot.dtos.UserSkillAddDto;
import com.project.snapshotspringboot.enumeration.UserRole;
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

    @GetMapping("/{role}")
    public List<SkillTreeDto> getSkillTree(@PathVariable("role") UserRole role) {
        return skillService.getSkillsByRole(role);
    }

    @PostMapping("/user/{role}")
    public void addUserSkills(@AuthenticationPrincipal AuthDetails authDetails,
                              @RequestBody UserSkillAddDto skillDto,
                              @PathVariable("role") UserRole role) {
        skillService.addUserSkills(authDetails, skillDto, role);
    }
}
