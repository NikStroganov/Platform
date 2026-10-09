package com.catalog.options.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum CurrencyCode {

    RUB("Рубль"),
    USD("Доллар");

    public final String label;
}
