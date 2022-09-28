package com.a601.backend.api.controller;

import com.a601.backend.api.domain.dto.common.ApiResult;
import com.a601.backend.api.domain.dto.response.DongScore;
import com.a601.backend.api.service.DongService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api(value = "동네 API")
@RestController
@CrossOrigin("*")
@RequestMapping("/dong")
public class DongController {

    @Autowired
    private DongService dongService;

    @ApiOperation(value = "동 점수 계산", notes="점수 계산 후 점수순으로 리스트 반환")
    @GetMapping("/rank")
    public ApiResult<DongScore> getRank(@RequestParam List<Integer> priorities, @RequestParam(name = "gu", required = false) List<String> guList){
        List<DongScore> list = dongService.computeDongScore(priorities, guList);
        return new ApiResult(200, list);
    }

    @ApiOperation(value = "dnti로 동 점수 계산", notes="점수 계산 후 점수순으로 리스트 반환")
    @GetMapping("/{dnti}")
    public ApiResult<DongScore> getRankByDnti(@PathVariable String dnti){
        List<DongScore> list = dongService.computeDongScoreByDnti(dnti);
        return new ApiResult(200, list);
    }
}
