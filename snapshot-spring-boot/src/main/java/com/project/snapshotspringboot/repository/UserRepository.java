package com.project.snapshotspringboot.repository;

import com.project.snapshotspringboot.entity.UserEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {

    Page<UserEntity> findAll(Pageable pageable);

    Optional<UserEntity> findByEmail(String email);

    boolean existsByEmail(String email);

    @Query(value = """
            SELECT searcher_id, MAX(grade) AS max_grade
            FROM interviews i
            JOIN interview_questions iq ON i.id = iq.interview_id
            JOIN skills s ON iq.skill_id = s.id
            WHERE s.name = ? AND iq.grade >= ?
            GROUP BY searcher_id;
            """, nativeQuery = true)
    List<Object[]> findSearcherIdsAndMaxGradeBySkillNameAndSkillGrade(String skillName, Integer skillGrade);

    @Modifying
    @Query("update UserEntity u set u.password = :password where u.id = :id")
    void setPasswordForUserById(@Param("password") String password,
                                  @Param("id") long id);
}