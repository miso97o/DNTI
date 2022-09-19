package com.a601.backend.api.controller;

import com.a601.backend.api.domain.dto.common.ApiResult;
import com.a601.backend.api.domain.dto.response.DongScore;
import com.a601.backend.api.domain.dto.response.ManyResult;
import com.a601.backend.api.service.DongService;
import com.a601.backend.api.service.ResponseService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Api(value = "동네 API")
@RestController
@RequestMapping("/dong")
public class DongController {

    @Autowired
    private DongService dongService;

    @Autowired
    private ResponseService responseService;

    @ApiOperation(value = "동 점수 계산", notes="점수 계산 후 점수순으로 리스트 반환")
    @GetMapping("/rank")
    public ApiResult<DongScore> getRank(@RequestParam List<Integer> priorities){
        List<DongScore> list = dongService.computeDongScore(priorities);
        return new ApiResult(200, list);
    }

}
