package com.project.snapshotspringboot.mapper;

import com.project.snapshotspringboot.dtos.interviewer.InterviewerQuestionRequestDto;
import com.project.snapshotspringboot.entity.InterviewerQuestionEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface InterviewerQuestionMapper {

    @Mapping(target = "skill.id", source = "skillId")
    @Mapping(target = "interviewer.id", source = "interviewerId")
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "question", source = "question")
    InterviewerQuestionEntity toEntity(InterviewerQuestionRequestDto questionDto);
}
