package com.a601.backend.api.controller;


import com.a601.backend.api.domain.dto.common.ApiResult;
import com.a601.backend.api.domain.dto.request.FavoriteRequest;
import com.a601.backend.api.domain.dto.request.UserRequest;
import com.a601.backend.api.domain.entity.User;
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

    //회원가입(닉네임,생년, 구, 동, 휴대폰번호, 아이디)
    @ApiOperation(value="회원가입")
    @PostMapping
    public ApiResult singIn(@RequestBody UserRequest.SingIn singIn){
        return new ApiResult<>(200, singIn.getNickname());
    }

    //닉네임 중복체크
    @ApiOperation(value = "닉네임 중복체크", notes="중복이면 true, 아니면 false")
    @GetMapping("/nickname")
    public ApiResult isDoubleNick(@RequestParam String nickname) {
        return new ApiResult(200, service.hasNickname(nickname));
    }

    //내정보 수정
    @ApiOperation(value = "내정보 수정", notes="내 정보 수정 후 해당 닉네임 반환")
    @PatchMapping
    public ApiResult modifyInfo(@RequestBody UserRequest.ModifyAll modifyAll) {
        service.modifyInfo(modifyAll);
        return new ApiResult(200, modifyAll.getUserId());
    }

    //dnti 수정

    //내 지역 바꾸기


    //회원탈퇴
    @ApiOperation(value = "회원탈퇴", notes="탈퇴 후 해당 아이디 반환")
    @DeleteMapping("/{userId}")
    public ApiResult signOut(@PathVariable String userId) {
        service.singOut(userId);
        return new ApiResult(200, userId);
    }

    //예시
    @ApiOperation(value = "회원 목록", notes="회원 목록")
    @GetMapping("/list")
    public ApiResult getList() {
        return new ApiResult(200,repository.findAll());
    }
}
