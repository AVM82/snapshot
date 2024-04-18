package com.project.snapshotspringboot.controller;

import com.project.snapshotspringboot.dtos.AuthenticationRequest;
import com.project.snapshotspringboot.dtos.AuthenticationResponse;
import com.project.snapshotspringboot.dtos.RegisterRequest;
import com.project.snapshotspringboot.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/auth", produces = "application/json")
@RequiredArgsConstructor
@Slf4j
public class AuthController {

    private final AuthenticationService service;

    @PostMapping("/register")
    public ResponseEntity<?> register(
            @RequestBody RegisterRequest request) {
        service.register(request);
        log.info("User created successfully");
        return ResponseEntity.ok().build();

    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthenticationRequest request) {

        return ResponseEntity.ok(service.authenticate(request));

    }
}


