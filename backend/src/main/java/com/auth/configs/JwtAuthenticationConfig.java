package com.auth.configs;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.JwtException;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import java.util.List;

@Configuration
public class JwtAuthenticationConfig {
    @Bean
    public JwtAuthenticationConverter jwtAuthenticationConverter() {
        JwtAuthenticationConverter converter = new JwtAuthenticationConverter();
        converter.setJwtGrantedAuthoritiesConverter(jwt -> {
            String type = jwt.getClaimAsString("type");
            if(!"access".equals(type)) {
                throw new JwtException("Invalid token type");
            }
            String role = jwt.getClaimAsString("scope");
            return List.of(new SimpleGrantedAuthority("ROLE_" + role));
                });
        return converter;
    }
}
