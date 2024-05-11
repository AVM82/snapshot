package com.project.snapshotspringboot.service;

import com.project.snapshotspringboot.dtos.*;
import com.project.snapshotspringboot.dtos.result.SkillResultDto;
import com.project.snapshotspringboot.dtos.result.UserResultsByInterviewsResponseDto;
import com.project.snapshotspringboot.entity.*;
import com.project.snapshotspringboot.mapper.UserMapper;
import com.project.snapshotspringboot.repository.*;
import com.project.snapshotspringboot.security.oauth2.model.AuthDetails;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@Slf4j
@AllArgsConstructor
public class UserService implements UserDetailsService {

    private final UserRepository repository;
    private final UserRoleSkillRepository userRoleSkillRepository;
    private final SkillRepository skillRepository;
    private final InterviewRepository interviewRepository;
    private final InterviewQuestionRepository interviewQuestionRepository;
    private final RoleService roleService;
    private final SkillService skillService;
    private final UserMapper userMapper;

    public UserEntity create(UserEntity user) {

        if (repository.existsByEmail(user.getEmail())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User with the same email already exists");
        }
        log.info("User created successfully");
        return repository.save(user);
    }

    public UserEntity getByEmail(String email) {
        return repository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
    }

    public UserEntity getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User is not authenticated!");
        }

        return ((AuthDetails) authentication.getPrincipal()).getUserEntity();
    }

    public List<UserResponseDto> findAllUser(Pageable pageable) {
        log.info("Get all users");
        Page<UserEntity> allUsers = repository.findAll(pageable);
        return allUsers.stream()
                .map(userMapper::toDto).toList();
    }

    public UserEntity findById(long id) {
        return repository
                .findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
    }

    public UserResponseDto getMe(AuthDetails authDetails) {
        return userMapper
                .toDto(authDetails.getUserEntity())
                .setRoles(userRoleSkillsToDto(
                        authDetails.getUserEntity().getId(),
                        authDetails.getUserEntity().getUserRoleSkillEntitySet()
                ));
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return new AuthDetails(getByEmail(username));
    }

    public Set<RoleDto> getRoles() {
        return roleService.getAllRoles();
    }

    public boolean existsByEmail(String email) {
        return repository.existsByEmail(email);
    }

    public UserEntity save(UserEntity userEntity) {
        return repository.save(userEntity);
    }

    public UserEntity saveNewUserWithDefaultRole(UserEntity userEntity) {
        UserRoleEntity role = roleService.findById(1L);
        userEntity.setId(0L);
        userEntity = save(userEntity);

        UserRoleSkillEntity userRoleSkillEntity = UserRoleSkillEntity
                .builder()
                .user(userEntity)
                .role(role)
                .build();
        userRoleSkillEntity = userRoleSkillRepository.save(userRoleSkillEntity);

        if (role.getUserRoleSkillEntitySet() == null) {
            role.setUserRoleSkillEntitySet(new HashSet<>());
        }
        role.getUserRoleSkillEntitySet().add(userRoleSkillEntity);
        userEntity.setUserRoleSkillEntitySet(new HashSet<>());
        userEntity.getUserRoleSkillEntitySet().add(userRoleSkillEntity);

        return userEntity;
    }

    public Optional<UserEntity> findByEmail(String email) {
        return repository.findByEmail(email);
    }

    private Set<RoleWithSkillsDto> userRoleSkillsToDto(long userId,
                                                       Set<UserRoleSkillEntity> userRoleSkillEntities) {
        return userRoleSkillEntities
                .stream()
                .map(UserRoleSkillEntity::getRole)
                .distinct()
                .map(entity -> RoleWithSkillsDto
                        .builder()
                        .id(entity.getId())
                        .name(entity.getName())
                        .skills(skillService.getUserSkillsTree(userId, entity.getId()))
                        .build())
                .collect(Collectors.toSet());
    }

    public UserResponseDto getUserByEmail(EmailDto emailDto) {
        UserEntity user = getByEmail(emailDto.getEmail());

        return userMapper
                .toDto(user)
                .setRoles(userRoleSkillsToDto(
                        user.getId(),
                        user.getUserRoleSkillEntitySet()
                ));
    }

    public List<UserResultsByInterviewsResponseDto> getUserInterviewsResults(Long userId) {
        List<UserResultsByInterviewsResponseDto> userInterviewResults = new ArrayList<>();

        List<InterviewEntity> interviews = interviewRepository.findBySearcherId(userId);

        for (InterviewEntity interview : interviews) {
            UserResultsByInterviewsResponseDto userInterviewDto = new UserResultsByInterviewsResponseDto();
            userInterviewDto.setInterviewId(interview.getId());
            userInterviewDto.setUserId(userId);
            userInterviewDto.setInterviewDateTime(interview.getEndDateTime());

            List<InterviewQuestionEntity> interviewQuestions = interviewQuestionRepository.findByInterviewId(interview.getId());

            List<SkillResultDto> skillResults = new ArrayList<>();

            Map<Long, List<Integer>> skillGrades = new HashMap<>();
            for (InterviewQuestionEntity question : interviewQuestions) {
                skillGrades.computeIfAbsent(question.getSkill().getId(), k -> new ArrayList<>()).add(question.getGrade());
            }

            for (Map.Entry<Long, List<Integer>> entry : skillGrades.entrySet()) {
                Long skillId = entry.getKey();
                double averageGrade = entry.getValue().stream().mapToInt(Integer::intValue).average().orElse(0.0);
                SkillResultDto skillResult = new SkillResultDto();
                skillResult.setSkillName(skillRepository.findById(skillId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Skill not found by id: " + skillId)).getName());
                skillResult.setAverageGrade(averageGrade);
                skillResults.add(skillResult);
            }

            userInterviewDto.setSkillResults(skillResults);

            userInterviewResults.add(userInterviewDto);
        }
        return userInterviewResults;
    }

    public List<UserResponseDto> findSearcherIdBySkillsAndGrades(List<UserSkillSearchRequestDto> skillGrades) {

        HashMap<Long, Integer> searcherIds = new HashMap<>();
        for (UserSkillSearchRequestDto skillGrade : skillGrades) {
            List<Long> searcherId = repository.findSearcherIdsBySkillNameAndSkillGrade(skillGrade.getSkillName(), skillGrade.getSkillGrade());
            for (Long Id : searcherId) {
                searcherIds.put(Id, searcherIds.getOrDefault(Id, 0) + 1);
            }
        }

        List<UserEntity> users = new ArrayList<>();
        for (Map.Entry<Long, Integer> id : searcherIds.entrySet()) {
            if (id.getValue() == skillGrades.size()) {
                Optional<UserEntity> userEntity = repository.findById(id.getKey());
                userEntity.ifPresent(users::add);
            }
        }
        return users.stream()
                .map(userMapper::toDto).toList();
    }
}
