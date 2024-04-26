package com.project.snapshotspringboot.controller;

import com.project.snapshotspringboot.dtos.SkillTreeDto;
import com.project.snapshotspringboot.dtos.UserSkillAddDto;
import com.project.snapshotspringboot.security.oauth2.model.AuthDetails;
import com.project.snapshotspringboot.service.SkillService;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/skills")
@Tag(name = "Skills", description = "Skill management endpoints!")
@SecurityRequirement(name = "jwt")
@ApiResponse(responseCode = "401", content = {@Content})
@RequiredArgsConstructor
@Slf4j
public class SkillController {
    private final SkillService skillService;

    @GetMapping("/role/{roleId}")
    public List<SkillTreeDto> getSkillTree(@PathVariable Long roleId) {
        return skillService.getSkillsByRoleId(roleId);
    }

    @PostMapping("/user/{roleId}")
    public void addUserSkills(@AuthenticationPrincipal AuthDetails authDetails,
                              @RequestBody UserSkillAddDto skillDto,
                              @PathVariable Long roleId) {
        skillService.addUserSkills(authDetails, skillDto, roleId);
    }
}
