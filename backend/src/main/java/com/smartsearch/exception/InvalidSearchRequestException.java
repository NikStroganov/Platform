package com.smartsearch.exception;

public class InvalidSearchRequestException extends RuntimeException {
    private final String field;

    public InvalidSearchRequestException(String field, String message) {
        super(message);
        this.field = field;
    }

    public String getField() {
        return field;
    }
}