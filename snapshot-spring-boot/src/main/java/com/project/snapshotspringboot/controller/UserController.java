package com.project.snapshotspringboot.controller;

import com.project.snapshotspringboot.dtos.RoleDto;
import com.project.snapshotspringboot.dtos.UserResponseDto;
import com.project.snapshotspringboot.security.oauth2.model.AuthDetails;
import com.project.snapshotspringboot.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
