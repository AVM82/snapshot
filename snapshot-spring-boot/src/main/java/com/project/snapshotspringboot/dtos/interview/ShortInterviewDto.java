package com.project.snapshotspringboot.dtos.interview;

import lombok.Data;

@Data
public class ShortInterviewDto {
    private Long id;
    private String title;
    private String status;
    private String interviewerFullName;
    private String searcherFullName;
    private String plannedDateTime;
    private String startDateTime;
    private String endDateTime;
}
