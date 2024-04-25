package com.project.snapshotspringboot.controller;

import com.project.snapshotspringboot.dtos.EmailDto;
import com.project.snapshotspringboot.dtos.RoleDto;
import com.project.snapshotspringboot.dtos.SkillTreeDto;
import com.project.snapshotspringboot.dtos.UserResponseDto;
import com.project.snapshotspringboot.security.oauth2.model.AuthDetails;
import com.project.snapshotspringboot.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Set;

@RestController
@RequestMapping("/users")
@AllArgsConstructor
public class UserController {

    private UserService service;

    @GetMapping("/hello")
    public Map<String, String> getHello() {
        return Map.of("message", "Hello");
    }

    @GetMapping("/me")
    public UserResponseDto getMe(@AuthenticationPrincipal AuthDetails authDetails) {
        return service.getMe(authDetails);
    }

    @GetMapping
    public List<UserResponseDto> getAllUsers(Pageable pageable) {
        return service.findAllUser(pageable);
    }

    @GetMapping("/all-roles")
    public Set<RoleDto> getRoles() {
        return service.getRoles();
    }

    @GetMapping("/user-skill-tree")
    public List<SkillTreeDto> getUserSkillTree(@AuthenticationPrincipal AuthDetails authDetails) {
        return service.getUserSkills(authDetails.getUserEntity().getId(), 1L);
    }

    @PostMapping("/by-email")
    public UserResponseDto getUserByEmail(@RequestBody EmailDto emailDto) {
        return service.getUserByEmail(emailDto);
    }
}
