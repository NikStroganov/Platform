package com.auth.configs;

import com.auth.configs.rsa.RsaKeyConverter;
import com.auth.configs.rsa.RsaKeyProperties;
import com.nimbusds.jose.jwk.JWKSet;
import com.nimbusds.jose.jwk.RSAKey;
import com.nimbusds.jose.jwk.source.ImmutableJWKSet;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtEncoder;

import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;

@Configuration
public class JwtConfig {

    //DONE Прописать ключи в application.properties (yml)
    //DONE Добавить конвертацию из application-prod.yml в RSAPrivateKey / RSAPublicKey

    private final RSAPrivateKey privateKey; //для подписи токена
    private final RSAPublicKey publicKey; //проверка подписи

    public JwtConfig(RsaKeyProperties props, RsaKeyConverter converter) {
        this.privateKey = converter.privateKey(props.getPrivateKeyPath());
        this.publicKey = converter.publicKey(props.getPublicKeyPath());
    }

    @Bean
    public JwtEncoder jwtEncoder() {
        var jwk = new RSAKey.Builder(publicKey)
                .privateKey(privateKey)
                .build();

        var jwks = new ImmutableJWKSet<>(new JWKSet(jwk));
        return new NimbusJwtEncoder(jwks);
    }

    //Проверка подписи токенов через Spring Security
    @Bean
    public JwtDecoder jwtDecoder() {
        return NimbusJwtDecoder.withPublicKey(publicKey).build();
    }

}
