package com.a601.backend.api.controller;


import com.a601.backend.api.domain.dto.common.ApiResult;
import com.a601.backend.api.domain.dto.request.UserRequest;
import com.a601.backend.api.domain.dto.response.*;
import com.a601.backend.api.service.*;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

@Api(value = "주소 API", tags = {"주소"})
@RestController
@CrossOrigin("*")
@RequestMapping("/address")
@AllArgsConstructor
public class AddressController {

    private final AddressServiceimpl service;

    //구 조회
    @ApiOperation(value = "구 조회", notes = "구 전체 조회")
    @GetMapping("/gu")
    public ApiResult getGu(){
        return new ApiResult(200, service.getGu());
    }

    //구에 따른 동조회
    @ApiOperation(value = "동 조회", notes = "구에 해당하는 조회")
    @GetMapping("/dong/{gu}")
    public ApiResult getDong(@PathVariable String gu){
        return new ApiResult(200, service.getDong(gu));
    }

}
