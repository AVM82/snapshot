package com.project.snapshotspringboot.config;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableMethodSecurity
@AllArgsConstructor
public class SecurityConfig {

    @Value("${cors.allowed-headers}")
    private List<String> allowedHeaders;

    @Value("${cors.allowed-origins}")
    private List<String> allowedOrigins;

    @Value("${cors.allowed-methods}")
    private List<String> allowedMethods;

    @Value("${cors.exposed-headers}")
    private List<String> exposedHeaders;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(cors -> cors.configurationSource(createCorsConfSource()))
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api-docs/**", "/h2-console/**").permitAll()
                        .anyRequest().permitAll())
                .sessionManagement(httpSecuritySessionManagementConfigurer -> httpSecuritySessionManagementConfigurer
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS));
        http.headers(h -> h.frameOptions(HeadersConfigurer.FrameOptionsConfig::disable));
        http.httpBasic(Customizer.withDefaults());

        return http.build();
    }

    private CorsConfigurationSource createCorsConfSource() {
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        corsConfiguration.setAllowedHeaders(allowedHeaders);
        corsConfiguration.setAllowedOrigins(allowedOrigins);
        corsConfiguration.setAllowedMethods(allowedMethods);
        corsConfiguration.setAllowCredentials(true);
        corsConfiguration.setExposedHeaders(exposedHeaders);

        UrlBasedCorsConfigurationSource corsConfigurationSource = new UrlBasedCorsConfigurationSource();
        corsConfigurationSource.registerCorsConfiguration("/**", corsConfiguration);
        return corsConfigurationSource;
    }
}
