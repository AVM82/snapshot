package com.project.snapshotspringboot.mapper;

import com.project.snapshotspringboot.dtos.interview.InterviewCreationDto;
import com.project.snapshotspringboot.dtos.interview.InterviewDto;
import com.project.snapshotspringboot.dtos.interview.ShortInterviewDto;
import com.project.snapshotspringboot.entity.InterviewEntity;
import com.project.snapshotspringboot.entity.UserEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.mapstruct.Named;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface InterviewMapper {
    InterviewEntity toEntity(InterviewCreationDto interviewEntity);

    InterviewDto toDto(InterviewEntity interviewEntity);

    @Mapping(source = "interviewer", target = "interviewerFullName", qualifiedByName = "concatenateFullName")
    @Mapping(source = "searcher", target = "searcherFullName", qualifiedByName = "concatenateFullName")
    ShortInterviewDto toShortDto(InterviewEntity interviewEntity);

    @Named("concatenateFullName")
    default String concatenateFullName(UserEntity user) {
        return user.getFirstname() + " " + user.getLastname();
    }
}
