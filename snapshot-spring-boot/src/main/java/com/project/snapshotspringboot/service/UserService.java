package com.project.snapshotspringboot.service;

import com.project.snapshotspringboot.entity.UserEntity;
import com.project.snapshotspringboot.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;

@Service
@Transactional(readOnly = true)
@Slf4j
@RequiredArgsConstructor
public class UserService {
    private final UserRepository repository;

    public UserEntity save(UserEntity user) {
        return repository.save(user);
    }

    public UserEntity create(UserEntity user) {
        if (repository.existsByUsername(user.getUsername())) {
            throw new RuntimeException("User with the same name already exists");
        }

        if (repository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("User with the same email already exists");
        }

        return save(user);
    }

    public UserEntity getByUsername(String username) {
        return repository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

    }
    public UserEntity getByEmail(String email) {
        return repository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }


     public UserDetailsService userDetailsService() {
        return this::getByEmail;
    }

    public UserEntity getCurrentUser() {

        var username = SecurityContextHolder.getContext().getAuthentication().getName();
        return getByUsername(username);
    }

    public Collection<UserEntity> findAllUser() {
        return repository.findAll();
    }
}
