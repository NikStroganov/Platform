package com.smartsearch.controller;

import com.smartsearch.api.dto.rq.SearchRequest;
import com.smartsearch.api.dto.rs.SearchResponse;
import com.smartsearch.enums.CatalogType;
import com.smartsearch.service.SmartSearchService;
import com.utils.responsevalidator.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/search_result")
public class SmartSearchController {

    private final SmartSearchService searchService;

    @GetMapping
    public ResponseEntity<ApiResponse<SearchResponse>> search(@Valid @ModelAttribute SearchRequest request) {
        return ResponseEntity
                .ok()
                .body(ApiResponse.success(
                        "Smart search result",
                        searchService.smartSearch(
                                request.type(),
                                request.query(),
                                request.page(),
                                request.size()
                        )
                ));
    }
}