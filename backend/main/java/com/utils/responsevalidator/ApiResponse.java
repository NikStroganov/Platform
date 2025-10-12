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

    @Schema(description = "Статус код операции")
    private int status;

    @Schema(description = "Сообщение с инофрмацией о результате операции")
    private String message;

    @Schema(description = "Блок с DTO")
    private Rs data;

    @Schema(description = "Эндпоинт запроса")
    private String path;

    @Schema(description = "Время запроса")
    private Instant timestamp;

    @Schema(description = "Статус код ошибки")
    private List<ApiError> statusError;

    public static <Rs> ApiResponse<Rs> success(int status, String message, Rs data, String path) {
        return ApiResponse.<Rs>builder()
                .success(true)
                .status(status)
                .message(message)
                .data(data)
                .path(path)
                .timestamp(Instant.now())
                .build();
    }

    public static <Rs> ApiResponse<Rs> error(int status, String message, String path, List<ApiError> statusError) {
        return ApiResponse.<Rs>builder()
                .success(false)
                .status(status)
                .message(message)
                .path(path)
                .timestamp(Instant.now())
                .statusError(statusError)
                .build();
    }
}
