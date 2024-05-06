package com.project.snapshotspringboot.dtos.status;

import com.project.snapshotspringboot.enumeration.InterviewStatus;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class StatusDto {
    private InterviewStatus status;
}
