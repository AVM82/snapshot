package com.project.snapshotspringboot.repository;

import com.project.snapshotspringboot.entity.SkillEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SkillRepository extends JpaRepository<SkillEntity, Long> {
    @Query(value = """
                WITH RECURSIVE rectree(id, name, parent_id) AS (
                    SELECT id, name, COALESCE(parent_id, 0)
                    FROM skills
                    WHERE COALESCE(parent_id, 0) = ?
                    UNION ALL
                    SELECT s.id, s.name, COALESCE(s.parent_id, 0)
                    FROM skills s
                    JOIN rectree
                    ON s.parent_id = rectree.id
                ) SELECT * FROM rectree;
            """, nativeQuery = true)
    List<SkillEntity> getSkillTree(Long id);
}
