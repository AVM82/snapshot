package com.project.snapshotspringboot.mapper;

import com.project.snapshotspringboot.dtos.UserResponseDto;
import com.project.snapshotspringboot.entity.UserEntity;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface UserMapper {

    UserResponseDto toDto(UserEntity userEntity);
}
