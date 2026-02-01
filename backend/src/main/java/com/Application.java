package com;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
//@ComponentScan(basePackages = {
//        "com/profile",
//        "com/auth",
//        "com/utils"
//})
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
