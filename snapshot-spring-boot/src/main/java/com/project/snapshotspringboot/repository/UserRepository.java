package com.project.snapshotspringboot.repository;

import com.project.snapshotspringboot.dtos.RoleDto;
import com.project.snapshotspringboot.entity.UserEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.Set;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {
    Page<UserEntity> findAll(Pageable pageable);
    Optional<UserEntity> findByEmail(String email);

    boolean existsByEmail(String email);
    Optional<UserEntity> findByUsername(String username);
    boolean existsByUsername(String username);

    @Query(value = """
                SELECT r.id, r.name
                FROM roles r
            """, nativeQuery = true)
    Set<RoleDto> findAllRoles();
}
