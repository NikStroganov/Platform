package com;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.springframework.test.web.servlet.MockMvc;

import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.security.KeyPairGenerator;
import java.util.Base64;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(properties = {
        "spring.datasource.url=jdbc:h2:mem:openapi;MODE=PostgreSQL;DB_CLOSE_DELAY=-1",
        "spring.datasource.driver-class-name=org.h2.Driver",
        "spring.datasource.username=sa",
        "spring.datasource.password=",
        "spring.jpa.hibernate.ddl-auto=none",
        "spring.mail.host=localhost",
        "springdoc.writer-with-order-by-keys=true",
        "debug=false",
        "logging.level.root=WARN"
})
@ActiveProfiles("openapi")
@AutoConfigureMockMvc
class OpenApiExport {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @DynamicPropertySource
    static void temporaryKeys(DynamicPropertyRegistry registry) throws Exception {
        // Build documentation without production secrets or a running database.
        var generator = KeyPairGenerator.getInstance("RSA");
        generator.initialize(2048);
        var keys = generator.generateKeyPair();
        Path privateKey = writeKey("PRIVATE KEY", keys.getPrivate().getEncoded());
        Path publicKey = writeKey("PUBLIC KEY", keys.getPublic().getEncoded());
        registry.add("jwt.rsa.private-key-path", () -> privateKey.toUri().toString());
        registry.add("jwt.rsa.public-key-path", () -> publicKey.toUri().toString());
    }

    private static Path writeKey(String type, byte[] key) throws Exception {
        Path file = Files.createTempFile("openapi-", ".pem");
        file.toFile().deleteOnExit();
        String encoded = Base64.getMimeEncoder(64, new byte[]{'\n'}).encodeToString(key);
        Files.writeString(file, "-----BEGIN " + type + "-----\n" + encoded
                + "\n-----END " + type + "-----\n", StandardCharsets.US_ASCII);
        return file;
    }

    @Test
    void exportOpenApi() throws Exception {
        byte[] response = mockMvc.perform(get("https://backend.careit.tech/v3/api-docs")
                        .secure(true)
                        .with(request -> {
                            request.setServerPort(443);
                            return request;
                        }))
                .andExpect(status().isOk())
                .andReturn().getResponse().getContentAsByteArray();
        JsonNode schema = objectMapper.readTree(response);
        assertFalse(schema.path("openapi").asText().isBlank(), "Missing OpenAPI version");
        assertFalse(schema.path("paths").isEmpty(), "OpenAPI must contain endpoints");
        assertEquals("https://backend.careit.tech",
                schema.path("servers").path(0).path("url").asText());

        Path output = Path.of(System.getProperty("openapi.output"));
        Files.createDirectories(output.toAbsolutePath().getParent());
        Files.writeString(output, objectMapper.writerWithDefaultPrettyPrinter()
                .writeValueAsString(schema) + "\n", StandardCharsets.UTF_8);
    }
}
