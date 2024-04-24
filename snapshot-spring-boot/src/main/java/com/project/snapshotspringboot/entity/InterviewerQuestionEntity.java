package com.project.snapshotspringboot.entity;

import jakarta.persistence.*;

@Entity(name = "interviewer_questions")
public class InterviewerQuestionEntity {
    @Id
    @Column(name = "id")
    private Long id;
    @ManyToOne
    @JoinColumn(name = "skill_id", referencedColumnName = "id")
    private SkillEntity skill;
    @ManyToOne
    @JoinColumn(name = "interviewer_id", referencedColumnName = "id")
    private UserEntity interviewer;
    @Column(name = "question")
    private String question;
}
