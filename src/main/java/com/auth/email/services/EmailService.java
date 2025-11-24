package com.auth.email.services;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    private JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
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
        //TODO прописать корректный email
        mailMessage.setFrom("Our email");
        mailMessage.setSubject(subject);
        mailMessage.setText(body);

        mailSender.send(mailMessage);
    }
}
