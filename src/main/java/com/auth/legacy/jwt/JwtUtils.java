package com.auth.legacy.jwt;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class JwtUtils {

    @Value("${jwt.secret}")
    private String secret; //секретный ключ из application.properties

    @Value("${jwt.expiration}") //время жизни токена
    private long expiration;

    //генерация токена
//    public String generateToken (User user) {
//        return
//    }
}
