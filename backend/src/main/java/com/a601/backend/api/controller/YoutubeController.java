package com.a601.backend.api.controller;

import com.a601.backend.api.domain.dto.common.ApiResult;
import com.a601.backend.api.service.YoutubeServiceImpl;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@Api(value = "자취남 API", tags = {"자취남 유튜브"})
@RestController
@CrossOrigin("*")
@RequestMapping("/youtube")
@AllArgsConstructor
public class YoutubeController {
    private final YoutubeServiceImpl service;

    @ApiOperation(value = "구별 자취남 유튜브 조회", notes="구로 자취남 유튜브 데이터 조회")
    @GetMapping("/{gu}")
    public ApiResult getYoutube(@PathVariable String gu) {
        return new ApiResult(200, service.getByGu(gu));
    }
}
