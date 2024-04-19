package com.project.snapshotspringboot.security;

import com.project.snapshotspringboot.config.AppProps;
import com.project.snapshotspringboot.service.UserService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Arrays;
import java.util.Objects;

@Component
@Slf4j
@RequiredArgsConstructor
public class AuthenticationTokenFilter extends OncePerRequestFilter {
    public static final String BEARER_PREFIX = "Bearer ";
    public static final String HEADER_NAME = "Authorization";
    private final JwtService jwtService;
    private final UserService userService;
    private final AppProps appProps;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain
    ) throws ServletException, IOException {

        if (Objects.nonNull(request.getRequestURI())
                && Arrays
                .stream(appProps.getSecurity().getPermitAllUris())
                .anyMatch(url -> request.getRequestURI().startsWith(url.replace("/**", "")))) {
            log.info("Permit all uri - {}", request.getRequestURI());
            filterChain.doFilter(request, response);
            return;
        }

        var authHeader = request.getHeader(HEADER_NAME);
        log.info("header = {}", authHeader);
        if (authHeader == null || !authHeader.startsWith(BEARER_PREFIX)) {
            log.info("No bearer header!");
            filterChain.doFilter(request, response);
            return;
        }

        var jwt = authHeader.substring(BEARER_PREFIX.length());
        var userId = jwtService.getUserIdFromToken(jwt);
        log.info("User id = {}", userId);
        var user = userService.findById(userId);

        SecurityContextHolder
                .getContext()
                .setAuthentication(new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities()));
        filterChain.doFilter(request, response);
    }
}
