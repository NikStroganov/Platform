package com.catalog.toplist.controller;

import com.catalog.toplist.dto.TopCityDto;
import com.catalog.toplist.service.TopCityService;
import com.utils.responsevalidator.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/catalog/cities")
@RequiredArgsConstructor
public class TopCityController {

    private final TopCityService topCityService;

    @GetMapping("/top")
    public ResponseEntity<ApiResponse<List<TopCityDto>>> getTopCities() {
        return ResponseEntity
                .ok()
                .body(ApiResponse.success(
                        "Top cities loaded successfully",
                        topCityService.getTopCities()
                ));
    }
}