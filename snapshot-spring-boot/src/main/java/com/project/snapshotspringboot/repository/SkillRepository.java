package com.project.snapshotspringboot.repository;

import com.project.snapshotspringboot.entity.Skill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SkillRepository extends JpaRepository<Skill, Long> {
    @Query(value = """
                WITH RECURSIVE rectree(id) AS (
                    SELECT *
                    FROM skills
                    WHERE id = ?
                    UNION ALL
                    SELECT s.*
                    FROM skills s
                             JOIN rectree
                                  ON s.parent_id = rectree.id
                ) SELECT * FROM rectree;
            """, nativeQuery = true)
    List<Skill> getSkillTree(Long id);
}
