package com.project.snapshotspringboot.controller;

import com.project.snapshotspringboot.dtos.UserDto;
import com.project.snapshotspringboot.entity.UserEntity;
import com.project.snapshotspringboot.service.UserService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/users")
@AllArgsConstructor
public class UserController {

    private UserService service;
    private ModelMapper mapper;


    @GetMapping("/hello")
    public Map<String, String> getHello() {
        return Map.of("message", "Hello");
    }

    @GetMapping("/me")
    public UserDto getMe(@AuthenticationPrincipal UserEntity userEntity) {
        return toDto(userEntity);
    }

    @GetMapping
    public ResponseEntity<?> getAllUsers() {
        List<UserDto> userDtos = service.findAllUser().stream()
                .map(this::toDto).toList();
        return new ResponseEntity<>(userDtos, HttpStatus.OK);
    }

    public UserDto toDto(UserEntity userEntity) {
        return mapper.map(userEntity, UserDto.class);
    }
}
