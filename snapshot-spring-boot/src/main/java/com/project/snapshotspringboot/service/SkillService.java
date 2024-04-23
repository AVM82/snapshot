package com.project.snapshotspringboot.service;

import com.project.snapshotspringboot.dtos.SkillTreeDto;
import com.project.snapshotspringboot.dtos.UserSkillAddDto;
import com.project.snapshotspringboot.entity.SkillEntity;
import com.project.snapshotspringboot.entity.UserEntity;
import com.project.snapshotspringboot.repository.SkillRepository;
import com.project.snapshotspringboot.security.oauth2.model.AuthDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SkillService {
    private final SkillRepository skillRepository;

    public void addUserSkills(AuthDetails authDetails, UserSkillAddDto skillDto, Long roleId) {
        UserEntity user = authDetails.getUserEntity();
        skillDto.getSkillIds().forEach(skillId -> skillRepository.addSkillToUser(user.getId(), roleId, skillId));
    }

    public List<SkillTreeDto> getSkillsByRoleId(Long roleId) {
        return roleId == 1 ? getSkillTree(0L) : getTopLevelSkills(0L);
    }

    public List<SkillTreeDto> getSkillTree(Long id) {
        List<SkillEntity> skillTree = skillRepository.getSkillTree(id);
        Map<Long, List<SkillEntity>> skillMap = skillTree.stream().collect(Collectors.groupingBy(SkillEntity::getParentId));
        return createSkillTree(skillMap, id);
    }

    public List<SkillTreeDto> createSkillTree(Map<Long, List<SkillEntity>> skillMap, Long rootId) {
        List<SkillTreeDto> list = new ArrayList<>();
        List<SkillEntity> skills = skillMap.get(rootId);
        if (skills == null) {
            return list;
        }
        skills.forEach(skill -> {
            SkillTreeDto skillTreeDTO = new SkillTreeDto();
            skillTreeDTO.setId(skill.getId());
            skillTreeDTO.setName(skill.getName());
            skillTreeDTO.setChildren(createSkillTree(skillMap, skill.getId()));
            list.add(skillTreeDTO);
        });
        return list;
    }

    public List<SkillTreeDto> getTopLevelSkills(Long id) {
        List<SkillEntity> skillTree = skillRepository.getSkillTree(id);
        List<SkillEntity> topLevelSkills = findTopLevelSkills(skillTree);
        Map<Long, List<SkillEntity>> skillMap = topLevelSkills.stream().collect(Collectors.groupingBy(SkillEntity::getParentId));
        return createSkillTree(skillMap, id);
    }

    private List<SkillEntity> findTopLevelSkills(List<SkillEntity> skillTree) {
        Set<Long> parentIds = skillTree.stream().map(SkillEntity::getParentId).collect(Collectors.toSet());
        List<SkillEntity> topLevelSkills = new ArrayList<>();

        for (SkillEntity skill : skillTree) {
            if (parentIds.contains(skill.getId())) {
                topLevelSkills.add(skill);
            }
        }
        return topLevelSkills;
    }
}
