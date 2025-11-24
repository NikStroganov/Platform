package com.auth.configs;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity

public class SecurityFilter {

    private JwtConfig jwtConfig;

    public SecurityFilter(JwtConfig jwtConfig) {
        this.jwtConfig = jwtConfig;
    }

    //Зачем тут выбрасывать исключение???
    //TODO RateLimiter - Фильтр OncePerRequestFilter отдельным классом (405 - Too many requests)
    //TODO .cors чтобы установить, с каких доменов модно отправолять запросы и какими методами
    //TODO .hasRole чтобы установить допустимые роли на конкретные эндпоинты
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(HttpMethod.POST, "/freeEndpoint1").permitAll()
                        .requestMatchers(HttpMethod.POST, "/freeEndpoint2").permitAll()
                        .requestMatchers(HttpMethod.POST, "/freeEndpoint3").permitAll()
                        .anyRequest().authenticated())
                .oauth2ResourceServer(config -> config.jwt(jwt -> jwt.decoder(jwtConfig.jwtDecoder())));
        return http.build();
    }
}
