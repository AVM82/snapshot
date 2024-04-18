package com.project.snapshotspringboot.service;

import com.project.snapshotspringboot.dtos.SkillDTO;
import com.project.snapshotspringboot.entity.Skill;
import com.project.snapshotspringboot.repository.SkillRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SkillService {
    private final SkillRepository skillRepository;

    public Skill getSkills(Long id) {
        return skillRepository.findById(id).orElse(null);
    }

    public List<SkillDTO> getSkillTree(Long id) {
        List<Skill> skillTree = skillRepository.getSkillTree(id);
        Map<Long, List<Skill>> skillMap = skillTree.stream().collect(Collectors.groupingBy(Skill::getParentId));
        return createSkillTree(skillMap, id);
    }

    public List<SkillDTO> createSkillTree(Map<Long, List<Skill>> skillMap, Long rootId) {
        List<SkillDTO> list = new ArrayList<>();
        List<Skill> skills = skillMap.get(rootId);
        if (skills == null) {
            return list;
        }
        skills.forEach(skill -> {
            SkillDTO skillDTO = new SkillDTO();
            skillDTO.setId(skill.getId());
            skillDTO.setName(skill.getName());
            skillDTO.setChildren(createSkillTree(skillMap, skill.getId()));
            list.add(skillDTO);
        });
        return list;
    }

}
