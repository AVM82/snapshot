package com.project.snapshotspringboot.dtos;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResetPasswordDto {
    private String token;
    private String password;
    private String repeatPassword;
}
