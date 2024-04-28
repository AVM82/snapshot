package com.project.snapshotspringboot.exception;

import com.project.snapshotspringboot.enumeration.InterviewStatus;
import lombok.Getter;

@Getter
public class StateTransitionException extends RuntimeException {
    private final InterviewStatus currentStatus;
    private final InterviewStatus newStatus;
    public StateTransitionException(String message, InterviewStatus currentStatus, InterviewStatus newStatus) {
        super(message);
        this.currentStatus = currentStatus;
        this.newStatus = newStatus;
    }

    @Override
    public String getMessage() {
        return "Invalid status transition from " + currentStatus + " to " + newStatus + " is not allowed.";
    }
}
