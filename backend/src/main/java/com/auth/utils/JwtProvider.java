package com.auth.utils;

import com.utils.enums.Errors;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.oauth2.jwt.*;
import org.springframework.stereotype.Service;

import java.time.Instant;


//DONE доработать весь блок auth с refresh токеном
@Service
public class JwtProvider {

    //DONE определиться со сроками жизни токенов
    @Value("${jwt.tokens.access-expiration:300}") //если в application.properties пусто, то задаем 300 с по умолчанию
    private Long accessExpiration;

    @Value("${jwt.tokens.refresh-expiration:604800}")
    private Long refreshExpiration;

    private final JwtEncoder jwtEncoder;
    private final JwtDecoder jwtDecoder;

    public JwtProvider(JwtEncoder jwtEncoder, JwtDecoder jwtDecoder) {
        this.jwtEncoder = jwtEncoder;
        this.jwtDecoder = jwtDecoder;
    }

    /**
     * Сервис-утилита для создания двух токенов Jwt - access (что тебе можно) и refresh (кто ты)
     * @param email - почта пользователя. Попадёт в токен как sub (subject)
     * @param role - роль пользователя. Попадёт в токен как claim scope
     * @return - кодирование токена RSA ключом
     */
    public String createAccessToken(String email, String role) {
        var now = Instant.now();

        //Формируем то, что будет лежать в payload
        var claims = JwtClaimsSet.builder()
                .issuer("login_app") //кто выпустил токен
                .subject(email) //для кого токен (email пользователя)
                .issuedAt(now) //когда создан
                .expiresAt(now.plusSeconds(accessExpiration)) //когда истекает срок жизни токена
                .claim("scope", role)
                .claim("type", "access")//кастомное поле
                .build();

        return jwtEncoder
                .encode(JwtEncoderParameters.from(claims))
                .getTokenValue();
    }


    /*
    Флоу: refresh-token → вытащили email для идентификации юзера → идем в DB за ним → user → role → перегенерим access-token
    Роль при генерации refresh токена избыточна
     */
    public String createRefreshToken(String email) {
        var now = Instant.now();

        var claims = JwtClaimsSet.builder()
                //стандартные поля JWT, зарезервированные спецификацией
                .issuer("login_app") //кто выпустил токен
                .subject(email) //для кого токен (email пользователя)
                .issuedAt(now) //когда создан
                .expiresAt(now.plusSeconds(refreshExpiration)) //когда истекает срок жизни токена
                .claim("type", "refresh")//кастомное поле
                .build();

        return jwtEncoder
                .encode(JwtEncoderParameters.from(claims))
                .getTokenValue();
    }

    public String validateRefreshToken(String token) {
        var jwt = jwtDecoder.decode(token); //Проверяем подпись
        String type = jwt.getClaimAsString("type");
        if(!("refresh".equals(type))) {
            throw new JwtException(Errors.INVALID_TOKEN_TYPE.getMessage());
        }
        return jwt.getSubject();
    }
}