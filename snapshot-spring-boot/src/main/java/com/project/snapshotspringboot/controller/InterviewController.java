package com.project.snapshotspringboot.controller;

import com.project.snapshotspringboot.dtos.InterviewResultsDto;
import com.project.snapshotspringboot.dtos.interview.InterviewCreationDto;
import com.project.snapshotspringboot.dtos.interview.InterviewDto;
import com.project.snapshotspringboot.dtos.interview.InterviewUpdateDto;
import com.project.snapshotspringboot.dtos.interview.ShortInterviewDto;
import com.project.snapshotspringboot.dtos.interviewer.*;
import com.project.snapshotspringboot.enumeration.InterviewStatus;
import com.project.snapshotspringboot.security.oauth2.model.AuthDetails;
import com.project.snapshotspringboot.service.InterviewService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/interviews")
@Tag(name = "Interviews", description = "Interview management endpoints!")
@SecurityRequirement(name = "jwt")
@ApiResponse(responseCode = "401", content = {@Content})
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE)
public class InterviewController {

    final InterviewService interviewService;

    @GetMapping("/{interviewId}/results")
    @Operation(summary = "Get interview results", description = "Get interview results")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Interview results found",
                    content = {@Content(mediaType = "application/json", schema = @Schema(implementation = InterviewResultsDto.class))}),
            @ApiResponse(responseCode = "404", description = "Interview not found", content = {@Content})
    })
    public InterviewResultsDto getInterviewResults(@PathVariable Long interviewId) {
        return interviewService.getInterviewResults(interviewId);
    }

    @GetMapping
    @Operation(summary = "Get all interviews", description = "Get all interviews of user")
    @ApiResponse(responseCode = "200", description = "Interviews found",
            content = {@Content(mediaType = "application/json", schema = @Schema(implementation = ShortInterviewDto.class))})
    public List<ShortInterviewDto> getAllInterviews(@AuthenticationPrincipal AuthDetails authDetails) {
        return interviewService.getInterviewList(authDetails);
    }

    @PatchMapping("/{interviewId}")
    @Operation(summary = "Update interview before it's start", description = "Update interview before it's start")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Interview updated successfully",
                    content = {@Content(mediaType = "application/json", schema = @Schema(implementation = InterviewDto.class))}),
            @ApiResponse(responseCode = "404", description = "Interview not found", content = {@Content}),
            @ApiResponse(responseCode = "400", description = "Invalid interview data", content = {@Content})
    })
    public InterviewDto updateInterview(@PathVariable Long interviewId,
                                        @RequestBody @Valid InterviewUpdateDto interviewDto) {
        return interviewService.updateInterview(interviewId, interviewDto);
    }

    @PatchMapping("/status/{interviewId}")
    @Operation(summary = "Update interview status", description = "Update interview status")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Interview status updated successfully",
                    content = {@Content(mediaType = "application/json", schema = @Schema(implementation = InterviewDto.class))}),
            @ApiResponse(responseCode = "404", description = "Interview not found", content = {@Content}),
            @ApiResponse(responseCode = "400", description = "Invalid interview status", content = {@Content})
    })
    public InterviewDto updateInterviewStatus(@RequestParam(name = "status") InterviewStatus status,
                                              @PathVariable Long interviewId) {
        return interviewService.updateInterviewStatus(interviewId, status);
    }


    @PostMapping
    @Operation(summary = "Create interview", description = "Create interview")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Interview created successfully",
                    content = {@Content(mediaType = "application/json", schema = @Schema(implementation = InterviewDto.class))}),
            @ApiResponse(responseCode = "400", description = "Invalid interview data", content = {@Content})
    })
    public InterviewDto createInterview(@AuthenticationPrincipal AuthDetails authDetails,
                                        @RequestBody @Valid InterviewCreationDto interviewDto) {
        return interviewService.createInterview(authDetails, interviewDto);
    }

    @PostMapping("/question")
    @Operation(summary = "Save question", description = "Save question")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Question saved successfully",
                    content = {@Content(mediaType = "application/json", schema = @Schema(implementation = InterviewerQuestionResponseDto.class))}),
            @ApiResponse(responseCode = "400", description = "Invalid question data", content = {@Content})
    })
    public InterviewerQuestionResponseDto saveQuestion(@AuthenticationPrincipal AuthDetails authDetails,
                                                       @RequestBody @Valid InterviewerQuestionRequestDto questionRequestDto) {
        return interviewService.saveQuestion(authDetails, questionRequestDto);
    }

    @PatchMapping("/question/grade")
    @Operation(summary = "Evaluate question", description = "Evaluate question (set grade)")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Question evaluated successfully",
                    content = {@Content(mediaType = "application/json", schema = @Schema(implementation = InterviewQuestionResponseDto.class))}),
            @ApiResponse(responseCode = "400", description = "Invalid question data", content = {@Content})
    })
    public InterviewQuestionResponseDto evaluateQuestion(@AuthenticationPrincipal AuthDetails authDetails,
                                                         @RequestBody @Valid InterviewQuestionRequestDto questionDto) {
        return interviewService.evaluateQuestion(authDetails, questionDto);
    }

    @GetMapping("/questions/skill/{id}")
    @Operation(summary = "Get interviewer questions by skill id.")
    @ApiResponse(responseCode = "200",
            content = {@Content(
                    array = @ArraySchema(schema = @Schema(implementation = InterviewerQuestionResponseDto.class)),
                    mediaType = "application/json")})
    public List<InterviewerQuestionResponseDto> getMyQuestionsBySkillId(
            @AuthenticationPrincipal AuthDetails authDetails,
            @RequestParam(name = "id") long id) {
        return interviewService.getMyQuestionsBySkillId(authDetails, id);
    }

    @PatchMapping("/{interviewId}/feedback")
    @Operation(summary = "Update feedback", description = "Update the feedback to the interview")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Feedback updated successfully",
                    content = {@Content(mediaType = "application/json", schema = @Schema(implementation = String.class))}),
            @ApiResponse(responseCode = "400", description = "Interview not found", content = {@Content})
    })
    public String updateFeedback(@PathVariable Long interviewId, @RequestBody String feedback) {
        return interviewService.updateFeedback(interviewId, feedback);
    }
}
