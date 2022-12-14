package com.a601.backend.api.controller;


import com.a601.backend.api.domain.dto.common.ApiResult;
import com.a601.backend.api.domain.dto.request.SavedntiRequest;
import com.a601.backend.api.domain.dto.request.UserRequest;
import com.a601.backend.api.domain.dto.response.*;
import com.a601.backend.api.service.*;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

@Api(value = "회원 API", tags = {"회원"})
@RestController
@CrossOrigin("*")
@RequestMapping("/users")
@AllArgsConstructor
public class UserController {

    private final UserServiceImpl service;
    private final DntiServiceImpl dntiService;
    private final FavoriteServiceImpl favoriteService;
    private final ReviewServiceImpl reviewService;
    private final BoardServiceImpl boardService;
    private final DongServiceImpl dongService;


    //회원가입(닉네임,생년, 구, 동, 휴대폰번호, 아이디)
    @ApiOperation(value="회원가입", notes="닉네임,생년, 구, 동, 휴대폰번호, 아이디")
    @PostMapping
    public ApiResult singIn(@RequestBody UserRequest.SingIn singIn, HttpServletResponse response){
        service.singIn(singIn,response);
        return new ApiResult<>(200, singIn.getNickname());
    }

    //닉네임 중복체크
    @ApiOperation(value = "닉네임 중복체크", notes="중복이면 true, 아니면 false")
    @GetMapping("/nickname")
    public ApiResult isDoubleNick(@RequestParam String nickname) {
        return new ApiResult(200, service.hasNickname(nickname));
    }

    @ApiOperation(value = "회원 정보 조회", notes="해당 아이디 회원정보 조회")
    @GetMapping("/{userId}")
    public ApiResult getList(@PathVariable String userId) {
        return new ApiResult(200,service.getInfo(userId));
    }

    @ApiOperation(value = "마이페이지 정보 조회", notes="해당 아이디 회원정보 조회")
    @GetMapping("/mypage/{email}")
    public ApiResult getMypage(@PathVariable String email) {
        //user
        UserRequest.All user = service.getInfo(email);

        DntiResponse dntiResponse = null;
        List<DongScore> dong = null;
        if(user.getDnti()!=null){
            dntiResponse = dntiService.getDnti(user.getDnti());
            //dnti - place
            dong = dongService.computeDongScoreByDnti(user.getDnti());
        }
        //favorite
        List<FavoriteResponse> favoriteList = favoriteService.getFavorite(email);

        //review
        List<ReviewResponse> reviewList = reviewService.reviewTop3Mine(email);

        //board
        List<BoardResponse> boardList = boardService.getMyBoard(email);

        UserRequest.MyPage result = new UserRequest.MyPage(user, dntiResponse, dong, favoriteList, reviewList, boardList);

        return new ApiResult(200,result);
    }

    @ApiOperation(value = "회원 목록", notes="회원 목록")
    @GetMapping("/list")
    public ApiResult getList() {
        return new ApiResult(200,service.getList());
    }

    //내정보 수정
    @ApiOperation(value = "회원 정보 수정", notes="내 정보 수정 후 해당 닉네임 반환")
    @PatchMapping
    public ApiResult modifyInfo(@RequestBody UserRequest.ModifyAll modifyAll) {
        service.modifyInfo(modifyAll);
        return new ApiResult(200, modifyAll.getUserId());
    }

    //dnti 수정

    //내 지역 바꾸기

    //회원조회


    //회원탈퇴
    @ApiOperation(value = "회원탈퇴", notes="탈퇴 후 해당 아이디 반환")
    @DeleteMapping("/{email}")
    public ApiResult signOut(@PathVariable String email) {
        service.singOut(email);
        return new ApiResult(200, email);
    }
    @ApiOperation(value = "dnti저장", notes="탈퇴 후 해당 아이디 반환")
    @PutMapping("/savednti")
    public ApiResult savednti(@RequestBody SavedntiRequest savedntiRequest, @CookieValue("userEmail") Cookie cookie) throws Exception {
        String email=cookie.getValue();
        System.out.println(savedntiRequest.getType()+" "+email+" 해당 값 확인");
        service.saveDnti(savedntiRequest.getType(),email);
        return new ApiResult(200,email);
    }
}
