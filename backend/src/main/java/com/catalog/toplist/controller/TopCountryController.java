package com.catalog.toplist.controller;

import com.catalog.toplist.dto.TopCountryDto;
import com.catalog.toplist.service.TopCountryService;
import com.utils.responsevalidator.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/catalog/countries")
@RequiredArgsConstructor
public class TopCountryController {
    private final TopCountryService topCountryService;

    @GetMapping("/top")
    public ResponseEntity<ApiResponse<List<TopCountryDto>>> getTopCountries() {
        return ResponseEntity
                .ok()
                .body(ApiResponse.success(
                        "Top countries loaded successfully",
                        topCountryService.getTopCountries()
                ));
    }
}