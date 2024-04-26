package com.project.snapshotspringboot.mapper;

import com.project.snapshotspringboot.dtos.QuestionScoreDto;
import com.project.snapshotspringboot.dtos.interviewer.InterviewQuestionDto;
import com.project.snapshotspringboot.dtos.interviewer.InterviewerQuestionRequestDto;
import com.project.snapshotspringboot.entity.InterviewQuestionEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface InterviewQuestionMapper {

    @Mapping(source = "grade", target = "grade")
    InterviewQuestionEntity toEntity(InterviewQuestionDto dto);

    InterviewQuestionEntity toEntity(InterviewerQuestionRequestDto questionDto);

    @Mapping(source = "skill.name", target = "skillName")
    QuestionScoreDto toDto(InterviewQuestionEntity entity);
}
