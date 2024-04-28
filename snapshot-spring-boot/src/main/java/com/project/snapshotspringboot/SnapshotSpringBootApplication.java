package com.project.snapshotspringboot;

import com.project.snapshotspringboot.config.AppProps;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties(AppProps.class)
public class SnapshotSpringBootApplication {
    public static void main(String[] args) {
        SpringApplication.run(SnapshotSpringBootApplication.class, args);
    }

}
