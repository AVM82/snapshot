package com.project.snapshotspringboot.mapper;

import com.project.snapshotspringboot.dtos.RoleDto;
import com.project.snapshotspringboot.dtos.RoleWithSkillsDto;
import com.project.snapshotspringboot.entity.UserRoleEntity;
import com.project.snapshotspringboot.entity.UserRoleSkillEntity;
import com.project.snapshotspringboot.service.SkillService;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Set;
import java.util.stream.Collectors;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public abstract class RoleMapper {
    protected SkillService skillService;

    @Autowired
    public void setSkillService(SkillService skillService) {
        this.skillService = skillService;
    }

    public abstract RoleDto toDto(UserRoleEntity userRoleEntity);

    Set<RoleWithSkillsDto> userRoleSkillsToDto(long userId, Set<UserRoleSkillEntity> userRoleSkillEntities) {
        return userRoleSkillEntities
                .stream()
                .map(UserRoleSkillEntity::getRole)
                .distinct()
                .map(entity -> RoleWithSkillsDto
                        .builder()
                        .id(entity.getId())
                        .name(entity.getName())
                        .skills(skillService.getUserSkillsTree(userId, entity.getId()))
                        .build())
                .collect(Collectors.toSet());
    }
}
