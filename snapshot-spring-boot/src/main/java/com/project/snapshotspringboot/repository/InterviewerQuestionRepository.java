package com.project.snapshotspringboot.repository;

import com.project.snapshotspringboot.entity.InterviewerQuestionEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.Set;

public interface InterviewerQuestionRepository extends JpaRepository<InterviewerQuestionEntity, Long> {

    boolean existsBySkillIdAndQuestion(Long skillId, String questionText);

    Set<InterviewerQuestionEntity> findAllByInterviewerIdAndSkillId(long interviewerId,
                                                                    long skillId);
    Optional<InterviewerQuestionEntity> findBySkillIdAndQuestion(Long skillId, String questionText);
}
