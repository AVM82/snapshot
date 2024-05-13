package com.project.snapshotspringboot.test;

import io.gatling.javaapi.core.*;

import static io.gatling.javaapi.core.CoreDsl.*;

// required for Gatling HTTP DSL
import io.gatling.javaapi.http.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import static io.gatling.javaapi.http.HttpDsl.*;

public class SnapshotSimulation extends Simulation {
    private static final Logger LOGGER = LoggerFactory.getLogger(SnapshotSimulation.class);
    private static final int USER_COUNT = Integer.parseInt(System.getProperty("USERS", "1"));
    private static final int RAMP_DURATION = Integer.parseInt(System.getProperty("RAMP_DURATION", "1"));
    public static final String AUTHORIZATION_HEADER = "Authorization";
    public static final String BEARER_JWT_TOKEN = "Bearer #{jwtToken}";

    private final HttpProtocolBuilder httpProtocol =
            http
                    .baseUrl("http://localhost:8080")
                    .acceptHeader("application/json")
                    .contentTypeHeader("application/json");

    private final ChainBuilder authorisation =
            exec(http("Authentication")
                    .post("/rest/auth/authenticate")
                    .body(ElFileBody("test/userAuth.json"))
                    .check(jmesPath("access_token").saveAs("jwtToken")));

    private final ChainBuilder userInfo =
            exec(http("Get user info")
                    .get("/rest/users/me")
                    .header(AUTHORIZATION_HEADER, BEARER_JWT_TOKEN)
                    .check(jmesPath("id").saveAs("id")));

    private final ChainBuilder profilePage =
            exec(http("Profile")
                    .get("/profile/#{id}")
                    .check(status().is(200)));

    private final ChainBuilder settingsPage =
            exec(http("Settings")
                    .get("/profile/#{id}/settings"));

    private final ChainBuilder interviewJournal =
            exec(http("Interview Journal")
                    .get("/profile/#{id}/interview-journal"));

    private final ChainBuilder getInterview =
            exec(http("Get existing interview")
                    .get("/interview/1"));

    private final ChainBuilder createInterview =
            exec(http("Create interview")
                    .post("/rest/interviews")
                    .header(AUTHORIZATION_HEADER, BEARER_JWT_TOKEN)
                    .body(StringBody(ElFileBody("test/interview.json")))
                    .check(jmesPath("id").saveAs("interviewId")));

    private final ChainBuilder getCreatedInterview =
            exec(http("Interview")
                    .get("/interview/#{interviewId}"));

    private final ChainBuilder startInterview =
            exec(http("Interview status change")
                    .patch("/rest/interviews/status/#{interviewId}?status=ACTIVE")
                    .header(AUTHORIZATION_HEADER, BEARER_JWT_TOKEN));
    private final ChainBuilder getQuestionsForSkill =
            exec(http("Skill questions")
                    .post("/rest/interviews/question")
                    .header(AUTHORIZATION_HEADER, BEARER_JWT_TOKEN)
                    .body(ElFileBody("test/interviewQuestion.json")));
    private final ChainBuilder endInterview =
            exec(http("Interview status change")
                    .patch("/rest/interviews/status/#{interviewId}?status=FINISHED")
                    .header(AUTHORIZATION_HEADER, BEARER_JWT_TOKEN));

    private final ScenarioBuilder scenario = scenario("Test Scenario")
            .pause(3)
            .exec(authorisation, userInfo, profilePage,
                    settingsPage,
                    interviewJournal,
                    getInterview, createInterview,
                    interviewJournal, getCreatedInterview,
                    startInterview, getQuestionsForSkill, endInterview
            );

    @Override
    public void before() {
        LOGGER.info("Starting simulation");
        LOGGER.info("Running test with {} users", USER_COUNT);
        LOGGER.info("Ramping users over {} seconds", RAMP_DURATION);
    }

    {
        setUp(
                scenario.injectOpen(rampUsers(USER_COUNT).during(RAMP_DURATION))
        ).protocols(httpProtocol)
                .assertions(global().successfulRequests().percent().is(100.0));
    }
}
