package com.project.snapshotspringboot.mapper;

import com.project.snapshotspringboot.dtos.UserResponseDto;
import com.project.snapshotspringboot.dtos.interview.InterviewCreationDto;
import com.project.snapshotspringboot.dtos.interview.InterviewDto;
import com.project.snapshotspringboot.dtos.interview.ShortInterviewDto;
import com.project.snapshotspringboot.entity.InterviewEntity;
import com.project.snapshotspringboot.entity.UserEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.mapstruct.Named;
import org.springframework.beans.factory.annotation.Autowired;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING, uses = {RoleMapper.class})
public abstract class InterviewMapper {
    protected UserMapper userMapper;

    @Autowired
    public void setRoleMapper(UserMapper userMapper) {
        this.userMapper = userMapper;
    }

    public abstract InterviewEntity toEntity(InterviewCreationDto interviewEntity);

    @Mapping(source = "interviewer", target = "interviewer", qualifiedByName = "mapUserToDto")
    @Mapping(source = "searcher", target = "searcher", qualifiedByName = "mapUserToDto")
    public abstract InterviewDto toDto(InterviewEntity interviewEntity);

    @Mapping(source = "interviewer", target = "interviewerFullName", qualifiedByName = "concatenateFullName")
    @Mapping(source = "searcher", target = "searcherFullName", qualifiedByName = "concatenateFullName")
    public abstract  ShortInterviewDto toShortDto(InterviewEntity interviewEntity);

    @Named("concatenateFullName")
    String concatenateFullName(UserEntity user) {
        return user.getFirstname() + " " + user.getLastname();
    }

    @Named("mapUserToDto")
    UserResponseDto mapUserToDto(UserEntity user) {
        return userMapper.toDto(user);
    }
}
