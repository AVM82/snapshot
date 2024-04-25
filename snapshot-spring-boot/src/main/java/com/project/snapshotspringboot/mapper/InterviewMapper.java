package com.project.snapshotspringboot.mapper;

import com.project.snapshotspringboot.dtos.interview.InterviewCreationDto;
import com.project.snapshotspringboot.dtos.interview.InterviewDto;
import com.project.snapshotspringboot.entity.InterviewEntity;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface InterviewMapper {
    InterviewEntity toEntity(InterviewCreationDto interviewEntity);

    InterviewDto toDto(InterviewEntity interviewEntity);
}
