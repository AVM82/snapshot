package com.project.snapshotspringboot.service;

import com.project.snapshotspringboot.dtos.AuthenticationRequest;
import com.project.snapshotspringboot.dtos.AuthenticationResponse;
import com.project.snapshotspringboot.dtos.RegisterRequest;
import com.project.snapshotspringboot.entity.UserEntity;
import com.project.snapshotspringboot.enumeration.UserRole;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserService userService;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest request) {

        var user = UserEntity.builder()
                .username(request.getUsername())
                .firstName(request.getFirstname())
                .lastName(request.getLastname())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(UserRole.SEARCHER)
                .build();

        userService.create(user);

        var jwt = jwtService.generateToken(user);
        return new AuthenticationResponse(jwt);
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                request.getUsername(),
                request.getPassword()
        ));

        var user = userService
                .userDetailsService()
                .loadUserByUsername(request.getUsername());

        var jwt = jwtService.generateToken(user);
        return new AuthenticationResponse(jwt);
    }
}
