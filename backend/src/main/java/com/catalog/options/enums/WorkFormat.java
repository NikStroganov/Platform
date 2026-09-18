package com.catalog.options.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum WorkFormat {
    OFFICE("Офис"),
    HYBRID("Гибрид"),
    REMOTE("Удаленно");

    private final String label;
}