package com.project.snapshotspringboot.mapper;

import com.project.snapshotspringboot.dtos.question.InterviewQuestionRequestDto;
import com.project.snapshotspringboot.dtos.question.InterviewQuestionResponseDto;
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
    InterviewerQuestionEntity toEntity(InterviewQuestionRequestDto questionDto);

    @Mapping(target = "skillName", source = "skill.name")
    InterviewQuestionResponseDto toResponseDto(InterviewerQuestionEntity entity);
}
