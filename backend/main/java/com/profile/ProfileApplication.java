package com.profile;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {
        "com/profile",
        "com/utils"
})
public class ProfileApplication {
    public static void main(String[] args) {
        SpringApplication.run(ProfileApplication.class, args);
    }
}
