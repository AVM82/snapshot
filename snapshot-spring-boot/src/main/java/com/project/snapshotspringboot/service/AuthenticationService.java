package com.project.snapshotspringboot.service;

import com.project.snapshotspringboot.dtos.AuthenticationRequest;
import com.project.snapshotspringboot.dtos.AuthenticationResponse;
import com.project.snapshotspringboot.dtos.RegisterRequest;
import com.project.snapshotspringboot.entity.UserEntity;
import com.project.snapshotspringboot.enumeration.UserRole;
import com.project.snapshotspringboot.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
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

    public AuthenticationResponse authenticate(AuthenticationRequest request) {

        var user = userService.getByEmail(request.getEmail());

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials!");
        }

        var jwt = jwtService.generateToken(user.getId());
        return new AuthenticationResponse(jwt);
    }
}
