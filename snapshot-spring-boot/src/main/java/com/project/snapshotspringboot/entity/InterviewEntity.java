package com.project.snapshotspringboot.entity;

import com.project.snapshotspringboot.enumeration.InterviewStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Entity(name = "interviews")
public class InterviewEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "title")
    private String title;
    @Column(name = "status")
    @Enumerated(EnumType.ORDINAL)
    private InterviewStatus status;
    @ManyToOne
    @JoinColumn(name = "interviewer_id", referencedColumnName = "id")
    private UserEntity interviewer;
    @ManyToOne
    @JoinColumn(name = "searcher_id", referencedColumnName = "id")
    private UserEntity candidate;
    @Column(name = "planned_date_time")
    private LocalDateTime plannedDateTime;
    @Column(name = "start_date_time")
    private LocalDateTime startDateTime;
    @Column(name = "end_date_time")
    private LocalDateTime endDateTime;
    @Column(name = "feedback")
    private String feedback;
    @OneToMany
    @JoinColumn(name = "interview_id", referencedColumnName = "id")
    private List<InterviewQuestionEntity> questions;
}
