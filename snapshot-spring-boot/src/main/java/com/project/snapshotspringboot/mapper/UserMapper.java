package com.project.snapshotspringboot.mapper;

import com.project.snapshotspringboot.dtos.RegisterRequest;
import com.project.snapshotspringboot.dtos.UserResponseDto;
import com.project.snapshotspringboot.entity.TempUserEntity;
import com.project.snapshotspringboot.entity.UserEntity;
import com.project.snapshotspringboot.security.oauth2.model.OAuth2UserInfo;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.mapstruct.Named;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public abstract class UserMapper {

    protected PasswordEncoder passwordEncoder;

    @Value("${registration.emailTokenExpireTimeInMinutes}")
    protected long registrationEmailTokenExpireTimeInMinutes;

    @Autowired
    public void setPasswordEncoder(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    public abstract UserResponseDto toDto(UserEntity userEntity);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "firstname", source = "name")
    @Mapping(target = "lastname", source = "oAuth2UserInfo", qualifiedByName = "emptyString")
    @Mapping(target = "avatarImgUrl", source = "imageUrl")
    public abstract UserEntity oauth2InfoToEntity(OAuth2UserInfo oAuth2UserInfo);

    @Mapping(target = "password", source = "password", qualifiedByName = "encodePassword")
    @Mapping(target = "expireAt", source = "registerRequest", qualifiedByName = "createExpireAt")
    public abstract TempUserEntity registerToTemp(RegisterRequest registerRequest);

    @Mapping(target = "id", ignore = true)
    public abstract UserEntity tempUserToUser(TempUserEntity tempUserEntity);

    @Named("createExpireAt")
    protected LocalDateTime currentLocalDateTime(RegisterRequest registerRequest) {
        return LocalDateTime.now().plusMinutes(registrationEmailTokenExpireTimeInMinutes);
    }

    @Named("encodePassword")
    protected String encodePassword(String password) {
        return passwordEncoder.encode(password);
    }

    @Named("emptyString")
    protected String getEmptyString(Object object) {
        return "";
    }
}
