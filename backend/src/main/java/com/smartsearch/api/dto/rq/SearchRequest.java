package com.smartsearch.api.dto.rq;

import com.smartsearch.enums.CatalogType;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.*;

//TODO доработать обработчик исключений для corner кейсов на min, max
public record SearchRequest(

        @NotNull
        @Schema(description = "Тип поиска")
        CatalogType type,
        @NotBlank
        @Size(max = 100)
        @Schema(description = "Запрос пользователя в поиске")
        String query,

        @Min(0)
        @Schema(description = "Номер страницы из общего списка")
        Integer page,

        @Min(0)
        @Max(50)
        @Schema(description = "Количество выводимых элементов")
        Integer size
) {
    public SearchRequest {
        page = page == null ? 0 : page;
        size = size == null ? 50 : size;
    }
}