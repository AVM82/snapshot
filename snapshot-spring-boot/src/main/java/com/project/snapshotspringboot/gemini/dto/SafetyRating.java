package com.project.snapshotspringboot.gemini.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SafetyRating {
    private String category;
    private String probability;
}
