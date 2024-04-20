package com.project.snapshotspringboot.mapper;

import com.project.snapshotspringboot.dtos.UserResponseDto;
import com.project.snapshotspringboot.entity.UserEntity;
import com.project.snapshotspringboot.enumeration.UserRole;
import com.project.snapshotspringboot.security.oauth2.model.OAuth2UserInfo;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.mapstruct.Named;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface UserMapper {

    UserResponseDto toDto(UserEntity userEntity);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "username", source = "name")
    @Mapping(target = "avatarImgUrl", source = "imageUrl")
    @Mapping(target = "role", source = "oAuth2UserInfo", qualifiedByName = "defaultRole")
    UserEntity oauth2InfoToEntity(OAuth2UserInfo oAuth2UserInfo);

    @Named("defaultRole")
    default UserRole defaultRole(OAuth2UserInfo oAuth2UserInfo) {
        return UserRole.SEARCHER;
    }
}
