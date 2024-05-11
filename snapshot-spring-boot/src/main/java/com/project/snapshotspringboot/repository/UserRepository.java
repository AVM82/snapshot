package com.project.snapshotspringboot.repository;

import com.project.snapshotspringboot.entity.UserEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {

    Page<UserEntity> findAll(Pageable pageable);

    Optional<UserEntity> findByEmail(String email);

    boolean existsByEmail(String email);

    @Query(value = """
                        SELECT DISTINCT searcher_id
            FROM interviews i
            JOIN interview_questions iq ON i.id = iq.interview_id
            JOIN skills s ON iq.skill_id = s.id
            WHERE s.name = ? AND iq.grade >= ?;
            """, nativeQuery = true)
    List<Long> findSearcherIdsBySkillNameAndSkillGrade(String skillName, Integer skillGrade);
}
