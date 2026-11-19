package com.smartsearch.api.dto.rq;

import com.smartsearch.enums.CatalogType;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.*;

//TODO доработать обработчик исключений для corner кейсов на min, max
public record SearchRequest(

        @NotNull(message = "Укажите тип каталога")
        @Schema(description = "Тип поиска")
        CatalogType type,
        @NotBlank(message = "Поисковый запрос не должен быть пустым")
        @Size(max = 100, message = "Поисковый запрос должен содержать не более 100 символов")
        @Schema(description = "Запрос пользователя в поиске")
        String query,

        @Min(value = 0, message = "Номер страницы не может быть отрицательным")
        @Schema(description = "Номер страницы, начиная с 0", defaultValue = "0")
        Integer page,

        @Min(value = 1, message = "Размер страницы должен быть не меньше 1")
        @Max(value = 50, message = "Размер страницы должен быть не больше 50")
        @Schema(description = "Количество элементов на странице", defaultValue = "50")
        Integer size
) {
    public SearchRequest {
        page = page == null ? 0 : page;
        size = size == null ? 50 : size;
    }
}