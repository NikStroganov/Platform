package com.utils.exceptions;

import com.utils.enums.Errors;
import com.utils.responsevalidator.ApiError;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.ConstraintViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import com.utils.responsevalidator.ApiResponse;
import java.util.List;
import java.util.stream.Collectors;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse<Object>> handleValidationException(MethodArgumentNotValidException ex) {
        List<ApiError> errors = ex.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(error -> new ApiError(
                        error.getField(),
                        error.getDefaultMessage()))
                .collect(Collectors.toList());

        return ResponseEntity
                .badRequest()
                .body(ApiResponse.error(
                        "Ошибка валидации входных данных в теле запроса",
                        errors
                ));
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<ApiResponse<Object>> handleConstraintViolation(ConstraintViolationException ex) {
        List<ApiError> errors = ex.getConstraintViolations()
                .stream()
                .map(violation -> new ApiError(
                        violation.getPropertyPath().toString(),
                        violation.getMessage()))
                .collect(Collectors.toList());
        return ResponseEntity
                .badRequest()
                .body(ApiResponse.error(
                        Errors.VALIDATION_ERROR.getMessage(),
                        errors
                ));
    }

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<ApiResponse<Object>> handleEntityNotFoundEx(EntityNotFoundException ex) {
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(ApiResponse.error(
                        ex.getMessage(),
                        List.of()
                ));
    }
    @ExceptionHandler(ApiException.class)
    public ResponseEntity<ApiResponse<Object>> handleApiException(ApiException ex) {
        return ResponseEntity
                .status(ex.getError().getStatus())
                .body(ApiResponse.error(
                        ex.getError().getMessage(),
                        ex.getErrors()
                ));
    }

    public ResponseEntity<ApiResponse<Object>> handleUnknown(Exception ex) {
        return ResponseEntity
                .status(Errors.INTERNAL_SYSTEM_ERROR.getStatus())
                .body(ApiResponse.error(
                        Errors.INTERNAL_SYSTEM_ERROR.getMessage(),
                        List.of()
                ));
    }
}