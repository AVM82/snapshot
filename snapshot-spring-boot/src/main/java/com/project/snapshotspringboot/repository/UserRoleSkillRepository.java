package com.project.snapshotspringboot.repository;

import com.project.snapshotspringboot.entity.UserRoleSkillEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRoleSkillRepository extends JpaRepository<UserRoleSkillEntity, Long> {
}
