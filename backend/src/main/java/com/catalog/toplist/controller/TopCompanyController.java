package com.catalog.toplist.controller;

import com.catalog.toplist.dto.TopCompanyDto;
import com.catalog.toplist.service.TopCompanyService;
import com.utils.responsevalidator.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/catalog/companies")
@RequiredArgsConstructor
public class TopCompanyController {
    private final TopCompanyService topCompanyService;

    @GetMapping("/top")
    public ResponseEntity<ApiResponse<List<TopCompanyDto>>> getTopCompanies() {
        return ResponseEntity
                .ok()
                .body(ApiResponse.success(
                        "Top companies loaded successfully",
                        topCompanyService.getTopCompanies()
                ));
    }
}