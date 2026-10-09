package com.catalog.options.controller;

import com.catalog.options.dto.CatalogOptionDto;
import com.catalog.options.service.CatalogOptionsService;
import com.utils.responsevalidator.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/catalog/options")
@RequiredArgsConstructor
public class CatalogOptionsController {

    private final CatalogOptionsService seniorityLevelService;

    @GetMapping("/seniority-levels")
    public ResponseEntity<ApiResponse<List<CatalogOptionDto>>> getSeniorityLevels() {
        return ResponseEntity
                .ok()
                .body(ApiResponse.success(
                        "Seniority levels",
                        seniorityLevelService.getSeniorityLevels()
                ));
    }

    @GetMapping("/work-formats")
    public ResponseEntity<ApiResponse<List<CatalogOptionDto>>> getWorkFormats() {
        return ResponseEntity
                .ok()
                .body(ApiResponse.success(
                        "Work formats",
                        seniorityLevelService.getWorkFormats()
                ));
    }
}