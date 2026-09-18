package com.catalog.toplist.utils;

import com.catalog.toplist.config.AppProperties;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class LogoBuilder {

    private final AppProperties properties;

    public String build(String logoKey) {
        return properties.staticBaseUrl() + logoKey;
    }
}