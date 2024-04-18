package com.project.snapshotspringboot.security;

import com.project.snapshotspringboot.config.AppProps;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;

@Component
@Slf4j
public class JwtService {

    private final AppProps appProps;
    private final SecretKey secretKey;

    @Autowired
    public JwtService(AppProps appProps) {
        this.appProps = appProps;
        this.secretKey = Keys.hmacShaKeyFor(appProps.getJwt().getSecret().getBytes(StandardCharsets.UTF_8));
    }

    public String generateToken(long userId) {
        LocalDateTime currentDateTime = LocalDateTime.now();
        return Jwts.builder()
                .subject(String.valueOf(userId))
                .issuedAt(Date.from(currentDateTime
                        .atZone(ZoneId.systemDefault())
                        .toInstant()))
                .expiration(Date.from(currentDateTime
                        .plusMinutes(appProps.getJwt().getExpirationTimeInMinutes())
                        .atZone(ZoneId.systemDefault())
                        .toInstant()))
                .signWith(secretKey)
                .compact();
    }

    public long getUserIdFromToken(String token) {
        try {
            return Long.parseLong(Jwts.parser()
                    .verifyWith(secretKey)
                    .build()
                    .parseSignedClaims(token)
                    .getPayload()
                    .getSubject());
        } catch (ExpiredJwtException e) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Expired token time!", e);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid token!", e);
        }
    }
}