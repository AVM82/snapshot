package com.project.snapshotspringboot.repository;

import com.project.snapshotspringboot.entity.InterviewQuestionEntity;
import com.project.snapshotspringboot.entity.SkillEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface InterviewQuestionRepository extends JpaRepository<InterviewQuestionEntity, Long> {

    List<InterviewQuestionEntity> findByInterviewId(Long interviewId);

    Optional<InterviewQuestionEntity> findById(Long id);

    boolean existsByInterviewIdAndSkillIdAndQuestion(Long interviewId, Long skillId, String questionText);

    Optional<InterviewQuestionEntity> findByInterviewIdAndSkillIdAndQuestion(Long interviewId, Long skillId, String questionText);
}
