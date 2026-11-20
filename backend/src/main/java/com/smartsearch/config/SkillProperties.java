package com.catalog.config;

import jakarta.validation.constraints.Min;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.bind.DefaultValue;
import org.springframework.validation.annotation.Validated;

@Validated
@ConfigurationProperties(prefix = "skills")
public record SkillProperties(

        @DefaultValue("15")
        @Min(
                value = 1,
                message = "Максимальное количество выбранных навыков должно быть не меньше 1"
        )
        int maxSelected,

        @DefaultValue("10")
        @Min(
                value = 1,
                message = "Количество рекомендуемых навыков должно быть не меньше 1"
        )
        int recommendationsLimit

) {}