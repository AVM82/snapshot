package com.project.snapshotspringboot.services;

import com.project.snapshotspringboot.entity.Skill;
import com.project.snapshotspringboot.repository.SkillRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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

    public List<Skill> getSkillTree(Long id) {
        List<Skill> skillTree = skillRepository.getSkillTree(id);
        skillTree.get(0).setParentId(0L);
        Map<Long, List<Skill>> skillMap = skillTree.stream().collect(Collectors.groupingBy(Skill::getParentId));
        return skillTree;
    }
}
