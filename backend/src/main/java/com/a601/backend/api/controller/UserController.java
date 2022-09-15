package com.a601.backend.api.controller;

import com.a601.backend.api.domain.entity.User;
import com.a601.backend.api.domain.request.UserRequest;
import com.a601.backend.api.domain.response.ApiResult;
import com.a601.backend.api.domain.response.ErrorResponse;
import com.a601.backend.api.repository.UserRepository;
import com.a601.backend.api.service.UserServiceImpl;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@Api(value = "회원 API", tags = {"학생"})
@RestController
@CrossOrigin("*")
@RequestMapping("/users")
@AllArgsConstructor
public class UserController {

    private final UserServiceImpl service;
    private final UserRepository repository;

    //회원가입(닉네임, 구, 동, 휴대폰번호, 아이디)
    @ApiOperation(value="회원가입")
    @PostMapping
    public ApiResult singIn(@RequestBody UserRequest.SingIn singIn){
        User user = User.builder().userId(singIn.getUserId()).birthYear(singIn.getBirthYear()).nickname(singIn.getNickname())
                .gu(singIn.getGu()).dong(singIn.getDong()).build();
        repository.save(user);
        return new ApiResult<>(200, singIn.getNickname());
    }


    //닉네임 중복체크
    @ApiOperation(value = "닉네임 중복체크", notes="닉네임 중복체크")
    @GetMapping("/nickname")
    public ApiResult isDoubleNick(@RequestParam String nickname) {
        return new ApiResult(200, service.hasNickname(nickname));
    }

    //내정보 수정(닉네임,


    //dnti 수정


    //내 지역 바꾸기


    //회원정보 수정



    //favorite 수정

    //favorite 삭제




    //회원탈퇴

    //예시
    @ApiOperation(value = "회원 목록", notes="회원 목록")
    @GetMapping("/list")
    public ApiResult getList() {
        return new ApiResult(200,repository.findAll());
    }
}
