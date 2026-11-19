package com.smartsearch.service;

import org.springframework.stereotype.Component;

import java.text.Normalizer;
import java.util.Locale;
import java.util.regex.Pattern;

@Component
public class SearchNormalizer {

    private static final Pattern WHITESPACE = Pattern.compile(
            "[\\s\\u001C-\\u001F]+", Pattern.UNICODE_CHARACTER_CLASS
    );

    public String normalize(String source) {
        if (source == null) {
            return "";
        }
        String normalized = Normalizer.normalize(source, Normalizer.Form.NFKC)
                .toLowerCase(Locale.ROOT)
                .replace('ё', 'е');

        return WHITESPACE.
                matcher(normalized).
                replaceAll(" ").
                strip();
    }
}