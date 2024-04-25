package com.project.snapshotspringboot.service;

import com.project.snapshotspringboot.dtos.RoleDto;
import com.project.snapshotspringboot.entity.UserRoleEntity;
import com.project.snapshotspringboot.mapper.RoleMapper;
import com.project.snapshotspringboot.repository.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RoleService {
    private final RoleRepository roleRepository;
    private final RoleMapper roleMapper;

    public Set<RoleDto> getAllRoles() {
        return roleRepository
                .findAll()
                .stream()
                .map(roleMapper::toDto)
                .collect(Collectors.toSet());
    }

    public UserRoleEntity findById(long id) {
        return roleRepository
                .findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Role table invalid!"));
    }
}
