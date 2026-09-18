package com.smartsearch.service;

import org.springframework.stereotype.Component;

import java.text.Normalizer;
import java.util.Locale;

@Component
public class SearchNormalizer {
    public String normalize(String source) {
        return source
                .trim()
                .replaceAll("\\s+", " ");
    }
}