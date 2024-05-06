package com.project.snapshotspringboot;

import com.project.snapshotspringboot.config.AppProps;
import com.project.snapshotspringboot.test.DataGeneratorService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@RequiredArgsConstructor
@EnableConfigurationProperties(AppProps.class)
public class SnapshotSpringBootApplication implements ApplicationRunner {

    private final DataGeneratorService dataGeneratorService;

    public static void main(String[] args) {
        SpringApplication.run(SnapshotSpringBootApplication.class, args);
    }

    //for test, delete later
    @Override
    public void run(ApplicationArguments args) throws Exception {
        dataGeneratorService.insertData();
    }
}
