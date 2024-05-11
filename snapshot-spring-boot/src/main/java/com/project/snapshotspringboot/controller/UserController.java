package com.project.snapshotspringboot.controller;

import com.project.snapshotspringboot.dtos.EmailDto;
import com.project.snapshotspringboot.dtos.RoleDto;
import com.project.snapshotspringboot.dtos.UserResponseDto;
import com.project.snapshotspringboot.dtos.result.UserResultsByInterviewsResponseDto;
import com.project.snapshotspringboot.security.oauth2.model.AuthDetails;
import com.project.snapshotspringboot.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Set;

@RestController
@RequestMapping("${rest.prefix}/users")
@Tag(name = "Users", description = "User management endpoints!")
@SecurityRequirement(name = "jwt")
@ApiResponse(responseCode = "401", content = {@Content})
@AllArgsConstructor
public class UserController {

    private UserService service;

    @Operation(summary = "Test endpoint without security. Will be deleted soon.")
    @ApiResponse(responseCode = "200", content = {@Content})
    @GetMapping("/hello")
    public Map<String, String> getHello() {
        return Map.of("message", "Hello");
    }

    @Operation(summary = "Get information about authorized user.")
    @ApiResponse(responseCode = "200",
            content = {@Content(schema = @Schema(implementation = UserResponseDto.class), mediaType = "application/json")})
    @GetMapping("/me")
    public UserResponseDto getMe(@AuthenticationPrincipal AuthDetails authDetails) {
        return service.getMe(authDetails);
    }

    @Operation(summary = "Get information about all users. Use Pageable.")
    @ApiResponse(responseCode = "200",
            content = {@Content(
                    array = @ArraySchema(schema = @Schema(implementation = UserResponseDto.class)),
                    mediaType = "application/json")})
    @GetMapping
    public List<UserResponseDto> getAllUsers(@ParameterObject Pageable pageable) {
        return service.findAllUser(pageable);
    }

    @Operation(summary = "Get information about all roles.")
    @ApiResponse(responseCode = "200",
            content = {@Content(
                    array = @ArraySchema(schema = @Schema(implementation = RoleDto.class)),
                    mediaType = "application/json")})
    @GetMapping("/all-roles")
    public Set<RoleDto> getRoles() {
        return service.getRoles();
    }

    @Operation(summary = "Get information about an user by email.")
    @ApiResponse(responseCode = "200",
            content = {@Content(schema = @Schema(implementation = UserResponseDto.class), mediaType = "application/json")})
    @ApiResponse(responseCode = "404", content = {@Content})
    @PostMapping("/by-email")
    public UserResponseDto getUserByEmail(@RequestBody EmailDto emailDto) {
        return service.getUserByEmail(emailDto);
    }

    @GetMapping("/portrait/{userId}")
    @Operation(summary = "Get a portrait of an IT specialist", description = "Get a portrait of an IT specialist based on the results of interviews")
    @ApiResponse(responseCode = "200", description = "Portrait of IT specialist found successfully",
            content = {@Content(mediaType = "application/json", schema = @Schema(implementation = UserResultsByInterviewsResponseDto.class))})
    @ApiResponse(responseCode = "400", description = "User (IT specialist) not found", content = {@Content})
    public List<UserResultsByInterviewsResponseDto> getResultsByInterviews(@PathVariable Long userId) {
        return service.getUserInterviewsResults(userId);
    }
    
    @Operation(summary = "Get all users by skills and grade", description = "Get all users by skills and grade based on the results of interviews")
    @ApiResponse(responseCode = "200", description = "Users (IT specialist) found successfully",
            content = {@Content(mediaType = "application/json", schema = @Schema(implementation = UserResponseDto.class))})
    @ApiResponse(responseCode = "400", description = "User (IT specialist) not found", content = {@Content})
    @GetMapping("/by-skills")
        public ResponseEntity<List<UserResponseDto>> findUsersBySkillsAndGrades(@RequestParam Map<String, String> skillGrades) {

        List<UserResponseDto> responseDto = service.findSearcherIdBySkillsAndGrades(skillGrades);
        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }
}
