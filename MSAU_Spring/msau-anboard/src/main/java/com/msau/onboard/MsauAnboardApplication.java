package com.msau.onboard;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = { SecurityAutoConfiguration.class })
public class MsauAnboardApplication {

    public static void main(String[] args) {
        SpringApplication.run(MsauAnboardApplication.class, args);
    }

}
