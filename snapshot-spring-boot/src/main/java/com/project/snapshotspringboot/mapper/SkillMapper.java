package com.project.snapshotspringboot.mapper;

import com.project.snapshotspringboot.dtos.SkillDto;
import com.project.snapshotspringboot.entity.SkillEntity;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface SkillMapper {

    SkillDto toDto(SkillEntity skillEntity);

}

