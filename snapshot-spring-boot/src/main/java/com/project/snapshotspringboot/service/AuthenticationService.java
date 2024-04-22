package com.project.snapshotspringboot.service;

import com.project.snapshotspringboot.dtos.*;
import com.project.snapshotspringboot.entity.UserEntity;
import com.project.snapshotspringboot.enumeration.UserRole;
import com.project.snapshotspringboot.security.JwtService;
import com.project.snapshotspringboot.security.token.RefreshToken;
import com.project.snapshotspringboot.security.token.RefreshTokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.Instant;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final RefreshTokenService refreshTokenService;
    private final UserService userService;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;

    public AuthenticationResponse register(RegisterRequest request) {

        var user = UserEntity.builder()
                .username(request.getUsername())
                .firstname(request.getFirstname())
                .lastname(request.getLastname())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(UserRole.SEARCHER)
                .build();

        return new AuthenticationResponse(jwtService.generateToken(userService.create(user).getId()));
    }

    public AuthenticationResponseWithRefreshToken authenticate(AuthenticationRequest request) {

        UserEntity user = userService.getByEmail(request.getEmail());

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials!");
        }

        String jwt = jwtService.generateToken(user.getId());
        RefreshToken refreshToken = refreshTokenService.createRefreshToken(user.getUsername());

        return new AuthenticationResponseWithRefreshToken(jwt, refreshToken.getToken());
    }

    public AuthenticationResponseWithRefreshToken refreshToken(RefreshTokenRequestDto refreshTokenRequestDto) {

        refreshTokenService.deleteByExpiryDateBefore(Instant.now());

        RefreshToken refreshToken = refreshTokenService.findByToken(refreshTokenRequestDto.getRefreshToken());
        if (refreshToken == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Refresh Token not found.");
        }

        refreshTokenService.save(refreshToken
                .setToken(UUID.randomUUID().toString())
                .setExpiryDate(refreshTokenService.createExpiryDate()));

        String jwt = jwtService.generateToken(refreshToken.getUserEntity().getId());

        return AuthenticationResponseWithRefreshToken.builder()
                .accessToken(jwt)
                .refreshToken(refreshToken.getToken()).build();

    }
}
