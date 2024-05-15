package com.project.snapshotspringboot.gemini.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UsageMetadata {
    private int promptTokenCount;
    private int candidatesTokenCount;
    private int totalTokenCount;
}
