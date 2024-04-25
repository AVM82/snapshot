package com.project.snapshotspringboot.mapper;

import com.project.snapshotspringboot.dtos.RoleDto;
import com.project.snapshotspringboot.entity.UserRoleEntity;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface RoleMapper {

    RoleDto toDto(UserRoleEntity userRoleEntity);
}
