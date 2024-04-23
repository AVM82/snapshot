package com.project.snapshotspringboot.controller;

import com.project.snapshotspringboot.dtos.*;
import com.project.snapshotspringboot.service.AuthenticationService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/auth", produces = "application/json")
@RequiredArgsConstructor
@Slf4j
public class AuthController {

    private final AuthenticationService service;

    @PostMapping("/register")
    public String register(@RequestBody RegisterRequest request) {
        return service.register(request);
    }

    @PostMapping("/authenticate")
    public AuthenticationResponseWithRefreshToken authenticate(@RequestBody AuthenticationRequest request) {
        return service.authenticate(request);
    }

    @PostMapping("/refresh-token")
    public AuthenticationResponseWithRefreshToken refreshToken(@RequestBody RefreshTokenRequestDto request) {
        return service.refreshToken(request);
    }

    @GetMapping("/submit-email")
    public void submitEmail(@RequestParam(name = "token") String token,
                            HttpServletResponse response) {
        service.submitEmail(token, response);
    }
}



