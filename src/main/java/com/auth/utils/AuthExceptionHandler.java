package com.auth.utils;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.server.ResponseStatusException;

@RestControllerAdvice
public class AuthExceptionHandler {

    @ExceptionHandler
    public ResponseEntity<Map<String, String>> defaultExceptionHandler(Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", e.getMessage()));
    }

   @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, String>> responseStatusExceptionHandler(ResponseStatusException e) {
       var error = Map.of("errorMessage", e.getReason(), "errorStatusCode", e.getStatusCode().toString());
       return ResponseEntity.status(e.getStatusCode()).body(error);
    }

}
