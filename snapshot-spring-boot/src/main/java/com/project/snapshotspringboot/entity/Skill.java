package com.project.snapshotspringboot.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "skills")
public class Skill {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;
    @Column(name = "name", nullable = false, length = 124)
    private String name;
    //    @ManyToOne
//    @JoinColumn(name = "parent_id")
//    private Skill parent;
    @Column(name = "parent_id")
    private Long parentId;
}
