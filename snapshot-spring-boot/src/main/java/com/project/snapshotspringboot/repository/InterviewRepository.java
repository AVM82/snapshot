package com.project.snapshotspringboot.repository;

import com.project.snapshotspringboot.entity.InterviewEntity;
import com.project.snapshotspringboot.enumeration.InterviewStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface InterviewRepository extends JpaRepository<InterviewEntity, Long> {
    List<InterviewEntity> findByInterviewer_IdOrSearcher_Id(Long id, Long id1);

    List<InterviewEntity> findBySearcherId(Long id);

    List<InterviewEntity> findBySearcherIdAndEndDateTimeBetween(Long searcherId, LocalDateTime from, LocalDateTime to);

    List<InterviewEntity> findByStatusAndPlannedDateTimeBetween(InterviewStatus interviewStatus, LocalDateTime tomorrow, LocalDateTime endOfTomorrow);

    @Query("""
        SELECT COUNT(i) > 0 FROM interviews i
        WHERE i.interviewer.id = :id
        AND i.plannedDateTime >= :start
        AND i.plannedDateTime <= :end
    """)
    boolean interviewerHaveInterviewOn(@Param("id") Long id, @Param("start") LocalDateTime start, @Param("end") LocalDateTime end);

    @Query("""
        SELECT COUNT(i) > 0 FROM interviews i
        WHERE i.searcher.id = :id
        AND i.plannedDateTime >= :start
        AND i.plannedDateTime <= :end
    """)
    boolean searcherHaveInterviewOn(@Param("id") Long id, @Param("start") LocalDateTime start, @Param("end") LocalDateTime end);

    List<InterviewEntity> findAllBySearcherIdAndStatus(long searcherId, InterviewStatus status);
}
