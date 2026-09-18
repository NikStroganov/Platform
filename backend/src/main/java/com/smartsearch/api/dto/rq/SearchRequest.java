package com.smartsearch.api.dto.rq;

import com.smartsearch.enums.CatalogType;
import jakarta.validation.constraints.*;

//TODO доработать обработчик исключений для corner кейсов на min, max
public record SearchRequest(

        @NotNull
        CatalogType type,
        @NotBlank
        @Size(max = 100)
        String query,

        @Min(0)
        Integer page,

        @Min(0)
        @Max(50)
        Integer size
) {
    public SearchRequest {
        page = page == null ? 0 : page;
        size = size == null ? 50 : size;
    }
}