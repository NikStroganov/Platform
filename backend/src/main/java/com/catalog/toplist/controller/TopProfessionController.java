package com.catalog.toplist.controller;

import com.catalog.toplist.dto.TopProfessionDto;
import com.catalog.toplist.service.TopProfessionsService;
import com.utils.responsevalidator.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/catalog/professions")
@RequiredArgsConstructor
public class TopProfessionController {

    private final TopProfessionsService topProfessionsService;

    @GetMapping("/top")
    public ResponseEntity<ApiResponse<List<TopProfessionDto>>> getTopProfessions() {
        return ResponseEntity
                .ok()
                .body(ApiResponse.success(
                        "Top professions loaded successfully",
                        topProfessionsService.getTopProfessions()
                ));
    }
}