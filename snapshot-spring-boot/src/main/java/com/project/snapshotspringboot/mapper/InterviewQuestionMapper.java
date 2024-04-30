package com.project.snapshotspringboot.mapper;

import com.project.snapshotspringboot.dtos.QuestionScoreDto;
import com.project.snapshotspringboot.dtos.question.InterviewQuestionGradeResponseDto;
import com.project.snapshotspringboot.dtos.question.InterviewQuestionRequestDto;
import com.project.snapshotspringboot.entity.InterviewQuestionEntity;
import com.project.snapshotspringboot.entity.SkillEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.mapstruct.Named;

import java.util.List;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface InterviewQuestionMapper {

    InterviewQuestionEntity toEntity(InterviewQuestionRequestDto questionDto);

    InterviewQuestionGradeResponseDto toDto(InterviewQuestionEntity interviewQuestionEntity);

    @Mapping(target = "skillName", source = "skill", qualifiedByName = "getSkillName")
    @Mapping(target = "grade", source = "grade", qualifiedByName = "mapToPercent")
    @Mapping(source = "createAt", target = "createdAt")
    QuestionScoreDto toScoreDto(InterviewQuestionEntity interviewQuestionEntity);

    default List<QuestionScoreDto> toScoreDtoList(List<InterviewQuestionEntity> interviewQuestionEntities) {
        return interviewQuestionEntities.stream().map(this::toScoreDto).toList();
    }

    @Named("getSkillName")
    default String getSkillName(SkillEntity skillEntity) {
        return skillEntity.getName();
    }

    @Named("mapToPercent")
    default String getPercent(Integer grade) {
        return grade + "%";
    }
}
