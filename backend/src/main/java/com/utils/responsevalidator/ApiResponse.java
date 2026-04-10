package com.utils.responsevalidator;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

import java.time.Instant;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@Builder
@Schema(description = "Ответы для операций с профилем пользователя")

//DONE Сделать через дженерики, чтобы это был универсальный шаблон на статусы ответа

public class ApiResponse<Rs> {
    @Schema(description = "Успешность операции")
    private boolean success;

    @Schema(description = "Сообщение с инофрмацией о результате операции")
    private String message;

    @Schema(description = "Блок с DTO")
    private Rs data;

    @Schema(description = "Время запроса")
    private Instant timestamp;

    @Schema(description = "Статус код ошибки")
    private List<ApiError> errors;

    public static <Rs> ApiResponse<Rs> success(String message, Rs data) {
        return ApiResponse.<Rs>builder()
                .success(true)
                .message(message)
                .data(data)
                .timestamp(Instant.now())
                .build();
    }

    public static <Rs> ApiResponse<Rs> error(String message, List<ApiError> errors) {
        return ApiResponse.<Rs>builder()
                .success(false)
                .message(message)
                .timestamp(Instant.now())
                .errors(errors != null ? errors : List.of())
                .build();
    }
}