package com.a601.backend.api.controller;


import com.a601.backend.api.domain.dto.common.ApiResult;
import com.a601.backend.api.domain.dto.request.KmRequest;
import com.a601.backend.api.service.KmService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Api(value = "1Km API")
@RequestMapping("/km")
@AllArgsConstructor
public class KmController {

    private final KmService kmService;

    // 위,경도 좌표를 받아서 1km 반경 내의 정보들을 불러옴
    @ApiOperation(value = "1km 반경 내의 정보 불러오기")
    @GetMapping
    public ApiResult selectKmList(KmRequest request) {
        return new ApiResult(200, kmService.calculateKm(request.getLat(), request.getLon()));
    }
}
