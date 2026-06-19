package com.email.services;

import com.email.config.MailProperties;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    private JavaMailSender mailSender;
    private MailProperties mailProperties;

    public EmailService(JavaMailSender mailSender,
                        MailProperties mailProperties) {
        this.mailSender = mailSender;
        this.mailProperties = mailProperties;
    }

    /**
     * Отправляет электронное письмо пользователю для восстановления пароля
     * @param email - адрес письма получателя
     * @param subject - тема письма
     * @param body - тело (текст) письма с временным токеном
     */

    public void sendEmail (String email, String subject, String body){
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(email);
        mailMessage.setFrom(mailProperties.getFrom());
        mailMessage.setSubject(subject);
        mailMessage.setText(body);
        mailSender.send(mailMessage);
    }
}
