package com.project.snapshotspringboot;

import com.project.snapshotspringboot.config.AppProps;
import com.project.snapshotspringboot.test.DataGeneratorService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@RequiredArgsConstructor
@EnableConfigurationProperties(AppProps.class)
@EnableScheduling
@EnableCaching
public class SnapshotSpringBootApplication implements ApplicationRunner {

    private final DataGeneratorService dataGeneratorService;

    @Value("${h2.enable-test-data}")
    private boolean isTestDataEnabled;

    public static void main(String[] args) {
        SpringApplication.run(SnapshotSpringBootApplication.class, args);
    }

    //for test, delete later
    @Override
    public void run(ApplicationArguments args) throws Exception {
        if (isTestDataEnabled) {
            dataGeneratorService.insertData();
        }
    }
}
