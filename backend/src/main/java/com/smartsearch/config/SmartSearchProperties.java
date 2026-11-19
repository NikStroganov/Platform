package com.smartsearch.config;

import jakarta.validation.constraints.*;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.bind.DefaultValue;
import org.springframework.validation.annotation.Validated;

@Validated
@ConfigurationProperties(prefix = "smart-search")
public record SmartSearchProperties(
        @DefaultValue("0.30")
        @DecimalMin("0.01")
        @DecimalMax("1.0")
        double minimumSimilarity,

        @DefaultValue("3")
        @Min(1)
        @Max(100)
        int minimumPartialQueryLength,

        @DefaultValue("4")
        @Min(1)
        @Max(100)
        int minimumFuzzyQueryLength
) {
    @AssertTrue(message = "minimum-fuzzy-query-length должен быть не меньше minimum-partial-query-length")
    public boolean isLengthConfigurationValid() {
        return minimumFuzzyQueryLength >= minimumPartialQueryLength;
    }
}