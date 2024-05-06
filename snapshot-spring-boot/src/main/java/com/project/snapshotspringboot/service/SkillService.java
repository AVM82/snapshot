package com.project.snapshotspringboot.service;

import com.project.snapshotspringboot.dtos.SkillDto;
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

    public List<SkillTreeDto> getSkillTree(Long rootId) {
        List<SkillEntity> skillTree = skillRepository.getSkillTree(rootId);
        Map<Long, List<SkillEntity>> skillMap = skillTree.stream().collect(Collectors.groupingBy(SkillEntity::getParentId));
        return createSkillTree(skillMap, rootId);
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

    /**
     * Method create a skill tree for the user with specified role
     *
     * @param userId user which skills are to be fetched
     * @param roleId role of user for which skills are fetched
     * @return skill tree for the user
     */
    public List<SkillTreeDto> getUserSkillsTree(Long userId, Long roleId) {
        Set<Long> skillIds = skillRepository.getUserSkills(userId, roleId);
        List<SkillTreeDto> skillTree = (roleId == 1 ? getSkillTree(0L) : getTopLevelSkills(0L));
        List<SkillTreeDto> userSkillTree = new ArrayList<>();
        for (SkillTreeDto s : skillTree) {
            SkillTreeDto skill = filterSkillTree(s, skillIds);
            if (skill != null) {
                userSkillTree.add(skill);
            }
        }
        return userSkillTree;
    }

    private SkillTreeDto filterSkillTree(SkillTreeDto root, Set<Long> userSkillIds) {
        if (root == null) {
            return null;
        }
        SkillTreeDto skill = new SkillTreeDto(root.getId(), root.getName(), new ArrayList<>());
        for (SkillTreeDto childNode : root.getChildren()) {
            SkillTreeDto filteredChildNode = filterSkillTree(childNode, userSkillIds);
            // Add childNode if it has children, or it is in the userSkillIds
            if (filteredChildNode != null) {
                skill.getChildren().add(filteredChildNode);
            }
            if (userSkillIds.contains(childNode.getId())) {
                skill.getChildren().add(childNode);
            }
        }
        return skill.getChildren().isEmpty() ? null : skill;
    }

    public List<String> getAllSkillsByUserId(Long userId) {
        List<String> skillDtoList = new ArrayList<>();
        List<SkillTreeDto> skillTreeDtoList = getUserSkillsTree(userId, 1L);
        for (SkillTreeDto skillTreeDto : skillTreeDtoList) {
            addLastLevelSkillNames(skillTreeDto, skillDtoList);
        }
        return skillDtoList;
    }

    private void addLastLevelSkillNames(SkillTreeDto skillTreeDto, List<String> skillDtoList) {
        if (skillTreeDto.getChildren().isEmpty()) {
            skillDtoList.add(skillTreeDto.getName());
        } else {
            for (SkillTreeDto subSkill : skillTreeDto.getChildren()) {
                addLastLevelSkillNames(subSkill, skillDtoList);
            }
        }
    }
}
