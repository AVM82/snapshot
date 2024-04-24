package com.project.snapshotspringboot.repository;

import com.project.snapshotspringboot.entity.InterviewerQuestionEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InterviewerQuestionRepository extends JpaRepository<InterviewerQuestionEntity, Long> {
}