package com.smartsearch.config;

import com.smartsearch.enums.CatalogType;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import java.util.Locale;

@Component
public class StringToCatalogTypeConverter implements Converter<String, CatalogType> {

    public CatalogType convert(String source) {
        return CatalogType.valueOf(source.trim().toUpperCase(Locale.ROOT));
    }
}