package com.catalog.toplist.controller;

import com.catalog.toplist.dto.TopSkillDto;
import com.catalog.toplist.service.TopSkillService;
import com.utils.responsevalidator.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/catalog/skills")
@RequiredArgsConstructor
public class TopSkillController {

    private final TopSkillService topSkillsService;

    @GetMapping("/top")
    public ResponseEntity<ApiResponse<List<TopSkillDto>>> getTopSkills(
            @RequestParam("professionId") UUID professionId
    ) {
        return ResponseEntity
                .ok()
                .body(ApiResponse.success(
                        "Top skills loaded successfully",
                        topSkillsService.getTopSkills(professionId)
                ));
    }
}