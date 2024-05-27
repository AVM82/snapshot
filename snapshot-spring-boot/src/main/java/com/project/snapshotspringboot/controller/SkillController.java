package com.project.snapshotspringboot.controller;

import com.project.snapshotspringboot.dtos.SkillDto;
import com.project.snapshotspringboot.dtos.SkillTreeDto;
import com.project.snapshotspringboot.dtos.UserSkillAddDto;
import com.project.snapshotspringboot.security.oauth2.model.AuthDetails;
import com.project.snapshotspringboot.service.SkillService;
import io.swagger.v3.oas.annotations.Operation;
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
@RequestMapping("${rest.prefix}/skills")
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

    @GetMapping("/{userId}")
    @Operation(summary = "Get all lower-level skills by user id for the SEARCHER role")
    @ApiResponse(responseCode = "200", description = "Skills found successfully",
            content = {@Content(mediaType = "application/json")})
    @ApiResponse(responseCode = "400", description = "User not found", content = {@Content})
    public List<String> getAllSkillsByUserId(@PathVariable Long userId) {
        return skillService.getAllSkillsByUserId(userId);
    }

    @GetMapping("/lower-level")
    @Operation(summary = "Get all lower-level skills for the SEARCHER role")
    @ApiResponse(responseCode = "200", description = "Skills found successfully",
            content = {@Content(mediaType = "application/json")})
    public List<SkillDto> getAllLastLevelSkills() {
        return skillService.getLastLevelSkills();
    }
}
