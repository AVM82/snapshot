package com.project.snapshotspringboot.service;

import com.project.snapshotspringboot.dtos.AuthenticationRequest;
import com.project.snapshotspringboot.dtos.AuthenticationResponse;
import com.project.snapshotspringboot.dtos.RegisterRequest;
import com.project.snapshotspringboot.entity.UserEntity;
import com.project.snapshotspringboot.enumeration.UserRole;
import com.project.snapshotspringboot.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserService userService;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;

    public void register(RegisterRequest request) {

        var user = UserEntity.builder()
                .username(request.getUsername())
                .firstName(request.getFirstname())
                .lastName(request.getLastname())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(UserRole.SEARCHER)
                .build();

        userService.create(user);
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {

        var user = userService.getByEmail(request.getEmail());

        var jwt = jwtService.generateToken(user.getId());
        return new AuthenticationResponse(jwt);
    }
}
