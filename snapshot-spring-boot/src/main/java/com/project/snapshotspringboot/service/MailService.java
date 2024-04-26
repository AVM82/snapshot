package com.project.snapshotspringboot.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class MailService {
    private static final String REQUEST_URL_TEMPLATE = "%s?token=%s";

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String username;

    @Value("${user.create.endpoint}")
    private String userCreateEndpoint;

    @Value("${submit.email.subject}")
    private String submitSubject;

    @Value("${submit.email.text}")
    private String submitText;

    public void sendEmailSubmitLetter(String to,
                                      String token) {
        String requestUrl = String.format(REQUEST_URL_TEMPLATE, userCreateEndpoint, token);
        send(to, submitSubject, String.format(submitText, requestUrl));
    }

    public void send(String to,
                     String subject,
                     String text) {
        MimeMessagePreparator preparator =
                mimeMessage -> {
                    final MimeMessageHelper message = new MimeMessageHelper(mimeMessage, true, "UTF-8");
                    message.setTo(to);
                    message.setSubject(subject);
                    message.setFrom(username);
                    message.setText(text, true);
                };
        try {
            mailSender.send(preparator);
        } catch (MailException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email sending was failed!", e);
        }
    }
}
