package com.catalog.options.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum SeniorityLevel {

    INTERN("Стажёр"),
    JUNIOR("Junior"),
    JUNIOR_PLUS("Junior+"),
    MIDDLE("Middle"),
    MIDDLE_PLUS("Middle+"),
    SENIOR("Senior"),
    EXPERT("Эксперт"),
    LEAD("Lead"),
    DIRECTOR("Директор");

    public final String label;
}