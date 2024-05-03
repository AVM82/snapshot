package com.project.snapshotspringboot.repository;

import com.project.snapshotspringboot.entity.InterviewEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InterviewRepository extends JpaRepository<InterviewEntity, Long> {
    List<InterviewEntity> findByInterviewer_IdOrSearcher_Id(Long id, Long id1);

    List<InterviewEntity> findBySearcherId(Long id);
}
