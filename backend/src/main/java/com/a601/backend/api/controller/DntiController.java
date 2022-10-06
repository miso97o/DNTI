package com.a601.backend.api.controller;

import com.a601.backend.api.domain.dto.common.ApiResult;
import com.a601.backend.api.service.DntiService;
import com.a601.backend.api.service.DntiServiceImpl;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@Api(value = "동네TI", tags = "동네TI")
@CrossOrigin("*")
@RestController
@RequestMapping("/dnti")
public class DntiController {

    @Autowired
    DntiServiceImpl dntiService;

    @ApiOperation(value="dnti 갯수 추가")
    @PatchMapping("/count/{type}")
    public ApiResult countDnti(@PathVariable String type) {
        dntiService.countDnti(type);
        return new ApiResult(200,"Success");
    }

    @ApiOperation(value="dnti 하나 조회", notes = "전체 갯수도 포함해서 줌")
    @GetMapping("/{type}")
    public ApiResult getOne(@PathVariable String type) {
        return new ApiResult(200,dntiService.getDnti(type));
    }

    @ApiOperation(value="dnti 전체 조회")
    @GetMapping("/all")
    public ApiResult getAll() {
        return new ApiResult(200, dntiService.getAllDnti());
    }

    @ApiOperation(value="dnti 사용자 수 조회", notes = "dnti 설문조사 응답수 반환")
    @GetMapping("/count")
    public ApiResult getCount() {
        return new ApiResult(200, dntiService.getCount());
    }
}
