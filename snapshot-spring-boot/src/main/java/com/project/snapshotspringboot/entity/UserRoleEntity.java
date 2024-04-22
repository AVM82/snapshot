package com.project.snapshotspringboot.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "roles")
public class UserRoleEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

//    @ManyToMany(mappedBy = "roles")
//    private Set<UserRoleSkillEntity> userRoleSkillEntitySet = new HashSet<>();
}
