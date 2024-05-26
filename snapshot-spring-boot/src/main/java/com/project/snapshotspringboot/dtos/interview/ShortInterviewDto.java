package com.project.snapshotspringboot.dtos.interview;

import com.project.snapshotspringboot.dtos.UserShortInfo;
import lombok.Data;

@Data
public class ShortInterviewDto {
    private Long id;
    private String title;
    private String status;
    private UserShortInfo interviewer;
    private UserShortInfo searcher;
    private String plannedDateTime;
    private String startDateTime;
    private String endDateTime;
}
