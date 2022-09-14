package com.a601.backend.api.controller;

import com.a601.backend.api.domain.enums.ErrorCode;
import com.a601.backend.api.exception.CustomException;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Api(value = "회원 API", tags = {"학생"})
@RestController
@CrossOrigin("*")
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {
//    @Autowired
//    UserServiceImpl service;


//    //닉네임 중복체크
//    @ApiOperation(value = "닉네임 중복체크", notes="닉네임 중복체크")
//    @GetMapping("/nickname")
//    public ResponseEntity<?> isDoubleNick(@RequestParam String nickname) {
//
//
//        return ResponseEntity<boolean>(service.hasNickname(nickname), HttpStatus.OK);
//    }

    //테스트용
    @ApiOperation(value = "에러 테스트", notes="에러 테스트 POSTS_NOT_FOUND")
    @GetMapping("/test")
    public String test() {
        throw new CustomException(ErrorCode.POSTS_NOT_FOUND);
    }


}
