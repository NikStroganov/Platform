package com.auth.configs.rsa;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.core.io.Resource;

@Setter
@Getter
@ConfigurationProperties(prefix = "jwt.rsa")
public class RsaKeyProperties {
    private Resource privateKeyPath;
    private Resource publicKeyPath;
}
