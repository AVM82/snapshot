package com.project.snapshotspringboot.repository;

import com.project.snapshotspringboot.entity.InterviewEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InterviewRepository extends JpaRepository<InterviewEntity, Long> {
}