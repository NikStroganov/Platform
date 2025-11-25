package com.auth.utils;

import com.auth.configs.JwtConfig;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
public class JwtActions {

    @Value("${jwt.expiration:300}") //если в application.properties пусто, то задаем 300 с по умолчанию
    private Long jwtExpiration;
    private final JwtConfig jwtConfig;

    public JwtActions(JwtConfig jwtConfig) {
        this.jwtConfig = jwtConfig;
    }

    /**
     * Сервис-утилита для создания токена Jwt
     * @param email - почта пользователя. Попадёт в токен как sub (subject)
     * @param role - роль пользователя. Попадёт в токен как claim scope
     * @return - кодирование токена RSA ключом
     */
    public String jwtCreate(String email, String role) {
        var now = Instant.now();

        //Формируем то, что будет лежать в payload
        var claims = JwtClaimsSet.builder()
                .issuer("login_app") //кто выпустил токен
                .subject(email) //для кого токен (email пользователя)
                .issuedAt(now) //когда создан
                .expiresAt(now.plusSeconds(jwtExpiration)) //когда истекает срок жизни токена
                .claim("scope", role) //кастомное поле
                .build();

        return jwtConfig.jwtEncoder().encode(JwtEncoderParameters.from(claims)).getTokenValue();
    }
}
