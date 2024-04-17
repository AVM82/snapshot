package com.project.snapshotspringboot.repository;

import com.project.snapshotspringboot.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<UserEntity, Long> {

}
