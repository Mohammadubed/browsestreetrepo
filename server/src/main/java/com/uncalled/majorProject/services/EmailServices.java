package com.uncalled.majorProject.services;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;

@Slf4j
@Service
public class EmailServices {

    @Autowired
    private JavaMailSender javaMailSender;

    private String generateOTP() {
        SecureRandom secureRandom = new SecureRandom();
        int otp = secureRandom.nextInt(900000) + 100000; // Ensures a 6-digit number
        return String.valueOf(otp);
    }

    public void sendEmail(String to ,String subject , String text){

        try{

            SimpleMailMessage email = new SimpleMailMessage();
            email.setTo(to);
            email.setSubject(subject);
            email.setText(text);
            javaMailSender.send(email);
        } catch (Exception e) {

            log.error("An Exception occurred in thread App/services/EmailServices/sendEmail with massage:{}",e.getMessage());
        }
    }

    public String generateNSendOtp(String to){

        try{

            String otp = generateOTP();
            String subject = "OTP From Shop And Service App";
            String text = "Your one time otp is :"+otp;
            sendEmail(to,subject,text);
            return otp;
        } catch (Exception e) {

            log.error("An Exception occurred in thread App/services/EmailServices/generateNSendOtp with massage:{}",e.getMessage());
            return null;
        }
    }
}
