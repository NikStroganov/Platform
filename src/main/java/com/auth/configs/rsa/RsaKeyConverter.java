package com.auth.configs.rsa;

import org.springframework.core.io.Resource;
import org.springframework.stereotype.Component;

import java.security.KeyFactory;
import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;
import java.util.Base64;

@Component
public class RsaKeyConverter {
    public RSAPrivateKey privateKey(Resource resource) {
        try {
            String pem = new String(resource.getInputStream().readAllBytes());
            return privateKeyFromPem(pem);
        } catch (Exception e) {
            throw new IllegalStateException("Failed to read private key", e);
        }
    }

    public RSAPublicKey publicKey(Resource resource) {
        try {
            String pem = new String(resource.getInputStream().readAllBytes());
            return publicKeyFromPem(pem);
        } catch (Exception e) {
            throw new IllegalStateException("Failed to read public key", e);
        }
    }
    public RSAPrivateKey privateKeyFromPem(String pem) {
        try {
            String key = pem
                    .replace("-----BEGIN PRIVATE KEY-----", "")
                    .replace("-----END PRIVATE KEY-----", "")
                    .replaceAll("\\s", "");

            byte[] decoded = Base64.getDecoder().decode(key);
            PKCS8EncodedKeySpec spec = new PKCS8EncodedKeySpec(decoded);
            KeyFactory kf = KeyFactory.getInstance("RSA");
            return (RSAPrivateKey) kf.generatePrivate(spec);
        } catch (Exception e) {
            throw new IllegalStateException("Invalid RSA private key", e);
        }
    }

    public RSAPublicKey publicKeyFromPem(String pem) {
        try {
            String key = pem
                    .replace("-----BEGIN PUBLIC KEY-----", "")
                    .replace("-----END PUBLIC KEY-----", "")
                    .replaceAll("\\s", "");

            byte[] decoded = Base64.getDecoder().decode(key);
            X509EncodedKeySpec spec = new X509EncodedKeySpec(decoded);
            KeyFactory kf = KeyFactory.getInstance("RSA");
            return (RSAPublicKey) kf.generatePublic(spec);
        } catch (Exception e) {
            throw new IllegalStateException("Invalid RSA public key", e);
        }
    }
}