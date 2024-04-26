package com.project.snapshotspringboot.mapper;

import com.project.snapshotspringboot.dtos.interviewer.InterviewerQuestionRequestDto;
import com.project.snapshotspringboot.entity.InterviewQuestionEntity;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface InterviewQuestionMapper {

    InterviewQuestionEntity toEntity(InterviewerQuestionRequestDto questionDto);

}
