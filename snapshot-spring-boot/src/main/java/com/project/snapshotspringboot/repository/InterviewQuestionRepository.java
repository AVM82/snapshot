package com.project.snapshotspringboot.repository;

import com.project.snapshotspringboot.entity.InterviewQuestionEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InterviewQuestionRepository extends JpaRepository<InterviewQuestionEntity, Long> {
}