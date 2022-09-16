package com.a601.backend.api.controller;

import com.a601.backend.api.domain.dto.common.ApiResult;
import com.a601.backend.api.service.DntiService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@Api(value = "동네TI")
@RestController
@RequestMapping("/dnti")
public class DntiController {

    @Autowired
    DntiService dntiService;

    @ApiOperation(value="dnti 갯수 추가")
    @PatchMapping("/count/{dnti}")
    public ApiResult countDnti(@PathVariable String dnti) {
        dntiService.countDnti(dnti);
        return new ApiResult(200,"Success");
    }

    @ApiOperation(value="dnti 하나 조회", notes = "전체 갯수도 포함해서 줌")
    @GetMapping("/{dnti}")
    public ApiResult getCnt(@PathVariable String dnti) {
        return new ApiResult(200,dntiService.getDntiCnt(dnti));
    }

    @ApiOperation(value="dnti 전체 조회")
    @GetMapping("/all")
    public ApiResult getAll() {
        return new ApiResult(200, dntiService.getAllDnti());
    }
}
