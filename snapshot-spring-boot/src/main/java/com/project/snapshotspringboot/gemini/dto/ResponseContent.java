package com.project.snapshotspringboot.gemini.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ResponseContent {
    private List<Part> parts;
    private String role;
}
