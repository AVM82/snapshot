package com.project.snapshotspringboot.repository;

import com.project.snapshotspringboot.entity.InterviewQuestionEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface InterviewQuestionRepository extends JpaRepository<InterviewQuestionEntity, Long> {

    List<InterviewQuestionEntity> findByInterviewId(Long interviewId);
    Optional<InterviewQuestionEntity> findById(Long id);
}
