package com.project.snapshotspringboot.service;

import com.project.snapshotspringboot.dtos.SkillTreeDTO;
import com.project.snapshotspringboot.entity.SkillEntity;
import com.project.snapshotspringboot.repository.SkillRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SkillService {
    private final SkillRepository skillRepository;

    public List<SkillTreeDTO> getSkillTree(Long id) {
        List<SkillEntity> skillTree = skillRepository.getSkillTree(id);
        Map<Long, List<SkillEntity>> skillMap = skillTree.stream().collect(Collectors.groupingBy(SkillEntity::getParentId));
        return createSkillTree(skillMap, id);
    }

    public List<SkillTreeDTO> createSkillTree(Map<Long, List<SkillEntity>> skillMap, Long rootId) {
        List<SkillTreeDTO> list = new ArrayList<>();
        List<SkillEntity> skills = skillMap.get(rootId);
        if (skills == null) {
            return list;
        }
        skills.forEach(skill -> {
            SkillTreeDTO skillTreeDTO = new SkillTreeDTO();
            skillTreeDTO.setId(skill.getId());
            skillTreeDTO.setName(skill.getName());
            skillTreeDTO.setChildren(createSkillTree(skillMap, skill.getId()));
            list.add(skillTreeDTO);
        });
        return list;
    }

    public List<SkillTreeDTO> getTopLevelSkills(Long id) {
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
