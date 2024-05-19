package com.project.snapshotspringboot.service;

import com.project.snapshotspringboot.entity.InterviewEntity;
import com.project.snapshotspringboot.entity.UserEntity;
import com.project.snapshotspringboot.enumeration.InterviewStatus;
import com.project.snapshotspringboot.repository.InterviewRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class MailService {
    private static final String REQUEST_URL_TEMPLATE = "%s?token=%s";

    private final JavaMailSender mailSender;

    private final InterviewRepository interviewRepository;

    @Value("${reminder.email.maxRetryAttempts}")
    private int maxRetryAttempts;

    @Value("${reminder.email.delayRetryInMinutes}")
    private long retryDelayInMinutes;

    @Value("${admin.email}")
    private String adminEmail;

    @Value("${reminder.email.host}")
    private String host;

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

    @Scheduled(cron = "0 0 9 * * ?")
    public void sendInterviewReminders() {
        LocalDateTime tomorrow = LocalDateTime.now().plusDays(1).withHour(0).withMinute(0).withSecond(0).withNano(0);
        LocalDateTime endOfTomorrow = tomorrow.plusDays(1).minusSeconds(1);

        List<InterviewEntity> scheduledInterviews = interviewRepository.findByStatusAndPlannedDateTimeBetween(
                InterviewStatus.PLANNED, tomorrow, endOfTomorrow);
        for (InterviewEntity interview : scheduledInterviews) {

            UserEntity interviewer = interview.getInterviewer();
            UserEntity searcher = interview.getSearcher();

            sendReminder(interviewer, searcher, interview);
            sendReminder(searcher, interviewer, interview);
        }
    }

    public void sendReminder(UserEntity recipient, UserEntity counterpart, InterviewEntity interview) {
        boolean success = false;
        int retryAttempts = 0;
        while (!success && retryAttempts < maxRetryAttempts) {
            try {
                String interviewLink = generateInterviewLink(interview);
                            String reminderText = String.format("Доброго дня, %s! Нагадуємо вам про заплановане інтерв'ю з %s %s завтра. Посилання на інтерв'ю: %s",
                                    recipient.getFirstname(), counterpart.getFirstname(), counterpart.getLastname(), interviewLink);


                send(recipient.getEmail(), "Нагадування про заплановане інтерв'ю", reminderText);
//                        "Доброго дня, " + recipient.getFirstname() + "! Нагадуємо вам про заплановане інтерв'ю з "
//                                + counterpart.getFirstname() + " " + counterpart.getLastname() + " завтра.");
                log.info("Sent reminder to " + recipient.getId() + ": " + recipient.getEmail());
                success = true;
            } catch (Exception e) {
                log.error("Failed to send reminder to " + recipient.getId() + ": " + recipient.getEmail(), e);
                retryAttempts++;
                try {
                    Thread.sleep(retryDelayInMinutes * 60 * 1000);
                } catch (InterruptedException ex) {
                    log.error("Interrupted Exception", ex);
                    Thread.currentThread().interrupt();
                }
            }
        }
        if (!success && retryAttempts == maxRetryAttempts) {
            log.error("Reminder email failed to send after all retry attempts: " + recipient.getEmail());
            sendAdminNotification(recipient.getEmail(), counterpart.getFirstname(), counterpart.getLastname());
        }

    }

    public String generateInterviewLink(InterviewEntity interview) {
        String interviewId = interview.getId().toString();
        return host + "/interview/" + interviewId;
    }
    private void sendAdminNotification(String recipientEmail, String counterpartFirstName, String counterpartLastName) {
        String message = String.format("Failed to send reminder to %s for the interview with %s %s", recipientEmail, counterpartFirstName, counterpartLastName);
        send(adminEmail, "Failed Interview Reminder Notification", message);
    }

}
