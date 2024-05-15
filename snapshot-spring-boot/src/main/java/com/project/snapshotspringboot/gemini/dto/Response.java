package com.project.snapshotspringboot.gemini.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class Response {
    private List<Candidate> candidates;
    private UsageMetadata usageMetadata;
}
