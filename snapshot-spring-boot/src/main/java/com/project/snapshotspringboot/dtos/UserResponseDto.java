package com.project.snapshotspringboot.dtos;

import com.project.snapshotspringboot.enumeration.UserRole;
import lombok.Data;

@Data
public class UserResponseDto {

    private Long id;
    private String firstname;
    private String lastname;
    private String email;
    private String avatarImgUrl;
    private String description;
    private UserRole role;

}
