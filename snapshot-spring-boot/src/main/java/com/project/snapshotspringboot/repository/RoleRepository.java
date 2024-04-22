package com.project.snapshotspringboot.repository;

import com.project.snapshotspringboot.entity.UserRoleEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<UserRoleEntity, Long> {
}
