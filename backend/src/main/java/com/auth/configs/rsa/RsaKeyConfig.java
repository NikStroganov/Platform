package com.auth.configs.rsa;

import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;

//Регистрируем RsaKeyProperties как бин и заполняем его из application-prod.yml
@Configuration
@EnableConfigurationProperties(RsaKeyProperties.class)
public class RsaKeyConfig {}
