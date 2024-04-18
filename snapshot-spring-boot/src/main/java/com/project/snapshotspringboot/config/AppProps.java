package com.project.snapshotspringboot.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;

@Getter
@Setter
@ConfigurationProperties(prefix = "app")
public class AppProps {
    private final JwtProps jwt = new JwtProps();

    @Getter
    @Setter
    public static class JwtProps {
        private String secret;
        private long expirationTimeInMinutes;
    }
}
