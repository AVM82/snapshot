package com.project.snapshotspringboot.gemini.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class Candidate {
    private ResponseContent content;
    private String finishReason;
    private int index;
    private List<SafetyRating> safetyRatings;
}
