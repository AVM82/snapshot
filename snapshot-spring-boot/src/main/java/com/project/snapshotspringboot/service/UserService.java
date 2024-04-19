package com.project.snapshotspringboot.service;

import com.project.snapshotspringboot.dtos.UserResponseDto;
import com.project.snapshotspringboot.entity.UserEntity;
import com.project.snapshotspringboot.mapper.UserMapper;
import com.project.snapshotspringboot.repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@Transactional(readOnly = true)
@Slf4j
@AllArgsConstructor
public class UserService implements UserDetailsService {

    private final UserRepository repository;
    private final UserMapper userMapper;

    public void create(UserEntity user) {

        if (repository.existsByUsername(user.getUsername())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User with the same name already exists");
        }

        if (repository.existsByEmail(user.getEmail())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User with the same email already exists");
        }
        log.info("User created successfully");
        repository.save(user);
    }

    public UserEntity getByUsername(String username) {
        return repository.findByUsername(username)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

    }

    public UserEntity getByEmail(String email) {
        return repository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
    }

    public UserEntity getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new IllegalStateException("User is not authenticated");
        }
        Object principal = authentication.getPrincipal();
        if (principal instanceof UserEntity) {
            return (UserEntity) principal;
        } else {
            String username = authentication.getName();
            return repository.findByUsername(username)
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
        }
    }

    public List<UserResponseDto> findAllUser(Pageable pageable) {
        log.info("Get all users");
        Page<UserEntity> allUsers = repository.findAll(pageable);
        return allUsers.stream()
                .map(userMapper::toDto).toList();
    }

    public UserEntity findById(long id) {
        return repository
                .findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
    }

    public UserResponseDto getMe(UserEntity userEntity) {
        return userMapper.toDto(userEntity);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return getByEmail(username);
    }
}
