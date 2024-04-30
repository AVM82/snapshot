package com.project.snapshotspringboot.controller;

import com.project.snapshotspringboot.dtos.AuthenticationRequest;
import com.project.snapshotspringboot.dtos.AuthenticationResponseWithRefreshToken;
import com.project.snapshotspringboot.dtos.RefreshTokenRequestDto;
import com.project.snapshotspringboot.dtos.RegisterRequest;
import com.project.snapshotspringboot.handler.dto.ResponseExceptionDto;
import com.project.snapshotspringboot.service.AuthenticationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "${rest.prefix}/auth", produces = "application/json")
@Tag(name = "Auth", description = "Authentication management endpoints!")
@RequiredArgsConstructor
@Slf4j
public class AuthController {

    private final AuthenticationService service;

    @Operation(summary = "Registers a new user.")
    @ApiResponse(responseCode = "200",
            content = {@Content(schema = @Schema(implementation = String.class), mediaType = "application/json")})
    @ApiResponse(responseCode = "400",
            content = {@Content(schema = @Schema(implementation = ResponseExceptionDto.class), mediaType = "application/json")})
    @PostMapping("/register")
    public String register(@RequestBody RegisterRequest request) {
        return service.register(request);
    }

    @Operation(summary = "Get an user authentication tokens.")
    @ApiResponse(responseCode = "200",
            content = {@Content(schema = @Schema(implementation = String.class), mediaType = "application/json")})
    @ApiResponse(responseCode = "401",
            content = {@Content(schema = @Schema(implementation = ResponseExceptionDto.class), mediaType = "application/json")})
    @ApiResponse(responseCode = "404",
            content = {@Content(schema = @Schema(implementation = ResponseExceptionDto.class), mediaType = "application/json")})
    @PostMapping("/authenticate")
    public AuthenticationResponseWithRefreshToken authenticate(@RequestBody AuthenticationRequest request) {
        return service.authenticate(request);
    }

    @Operation(summary = "Refresh an user authentication tokens.")
    @ApiResponse(responseCode = "200",
            content = {@Content(schema = @Schema(implementation = String.class), mediaType = "application/json")})
    @ApiResponse(responseCode = "401",
            content = {@Content(schema = @Schema(implementation = ResponseExceptionDto.class), mediaType = "application/json")})
    @PostMapping("/refresh-token")
    public AuthenticationResponseWithRefreshToken refreshToken(@RequestBody RefreshTokenRequestDto request) {
        return service.refreshToken(request);
    }

    @Operation(summary = "Create a new user.")
    @ApiResponse(responseCode = "201",
            content = {@Content(schema = @Schema(implementation = String.class), mediaType = "application/json")})
    @ApiResponse(responseCode = "400",
            content = {@Content(schema = @Schema(implementation = ResponseExceptionDto.class), mediaType = "application/json")})
    @GetMapping("/create-user")
    @ResponseStatus(HttpStatus.CREATED)
    public void createUser(@RequestParam(name = "token") String token,
                           HttpServletResponse response) {
        service.createUser(token, response);
    }
}



