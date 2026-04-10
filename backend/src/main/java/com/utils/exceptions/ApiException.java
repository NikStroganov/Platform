package com.utils.exceptions;

import com.utils.enums.Errors;
import com.utils.responsevalidator.ApiError;
import lombok.Getter;

import java.util.List;

@Getter
public class ApiException extends RuntimeException {

    private final Errors error;
    private final List<ApiError> errors;

    public ApiException(Errors error) {
        super(error.getMessage());
        this.error = error;
        this.errors = List.of(new ApiError(null, error.getMessage()));
    }

    public ApiException(Errors error, String field) {
        super(error.getMessage());
        this.error = error;
        this.errors = List.of(new ApiError(field, error.getMessage()));
    }

    public ApiException(Errors error, List<ApiError> errors) {
        super(error.getMessage());
        this.error = error;
        this.errors = errors;
    }
}