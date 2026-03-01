package com.auth.configs;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    private final JwtConfig jwtConfig;
    private final JwtAuthenticationConverter jwtAuthenticationConverter;

    public SecurityConfig(JwtConfig jwtConfig, JwtAuthenticationConverter jwtAuthenticationConverter) {
        this.jwtConfig = jwtConfig;
        this.jwtAuthenticationConverter = jwtAuthenticationConverter;
    }

    //Зачем тут выбрасывать исключение???
    //TODO RateLimiter - Фильтр OncePerRequestFilter отдельным классом (405 - Too many requests)
    //TODO .cors чтобы установить, с каких доменов модно отправолять запросы и какими методами
    //TODO .hasRole чтобы установить допустимые роли на конкретные эндпоинты

    //TODO Сделать разделение на публичные и защищенные эндпоинты
    //TODO добавить в цепочку валидацию access токена
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/swagger-ui.html", "/swagger-ui/**", "/v3/api-docs/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/v1/verify/isUser").permitAll() //с каких эндпоинтов можно осуществить доступ
                        .requestMatchers(HttpMethod.POST, "/api/v1/verify/verifyEmail").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/v1/verify/send-confirm-code").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/v1/verify/reset-password").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/v1/auth/register").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/v1/auth/login").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/v1/auth/refresh").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/v1/auth/set-new-password").permitAll()
                        .requestMatchers(HttpMethod.POST, "/error").permitAll()
                        .anyRequest().authenticated())
                //Проверка подписи через создание бина NimbusJwtDecoder с публичным RSA-ключом
                .oauth2ResourceServer(config -> config
                        .jwt(jwt -> jwt
                                .decoder(jwtConfig.jwtDecoder())
                                .jwtAuthenticationConverter(jwtAuthenticationConverter)
                        )
                );
        return http.build();
    }
}

