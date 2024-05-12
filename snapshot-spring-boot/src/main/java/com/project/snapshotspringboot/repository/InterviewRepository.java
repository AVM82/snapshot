package com.project.snapshotspringboot.repository;

import com.project.snapshotspringboot.entity.InterviewEntity;
import com.project.snapshotspringboot.enumeration.InterviewStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDateTime;
import java.util.List;

public interface InterviewRepository extends JpaRepository<InterviewEntity, Long> {
    List<InterviewEntity> findByInterviewer_IdOrSearcher_Id(Long id, Long id1);

    List<InterviewEntity> findBySearcherId(Long id);

    List<InterviewEntity> findBySearcherIdAndEndDateTimeBetween(Long searcherId, LocalDateTime from, LocalDateTime to);

    List<InterviewEntity> findByStatusAndPlannedDateTimeBetween(InterviewStatus interviewStatus, LocalDateTime tomorrow, LocalDateTime endOfTomorrow);
}
