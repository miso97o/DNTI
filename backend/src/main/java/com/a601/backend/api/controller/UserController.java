package com.a601.backend.api.controller;

import com.a601.backend.api.domain.enums.ErrorCode;
import com.a601.backend.api.domain.response.ApiResult;
import com.a601.backend.api.domain.response.ApiUtils;
import com.a601.backend.api.exception.CustomException;
import com.a601.backend.api.service.UserServiceImpl;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@Api(value = "회원 API", tags = {"학생"})
@RestController
@CrossOrigin("*")
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {
    @Autowired
    UserServiceImpl service;


    //닉네임 중복체크
    @ApiOperation(value = "닉네임 중복체크", notes="닉네임 중복체크")
    @GetMapping("/nickname")
    public ApiResult isDoubleNick(@RequestParam String nickname) {
        return ApiUtils.success(service.hasNickname(nickname));
    }



}
