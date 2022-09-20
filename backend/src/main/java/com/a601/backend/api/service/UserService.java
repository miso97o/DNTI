package com.a601.backend.api.service;


import com.a601.backend.api.domain.dto.request.UserRequest;
import com.a601.backend.api.domain.entity.User;

import java.util.List;

public interface UserService {
    //회원가입
    void singIn(UserRequest.SingIn singIn) throws Exception;

    //회원정보 수정
    void modifyInfo(UserRequest.ModifyAll modifyAll) throws Exception;

//    //dnti 수정
//    void modifyDnti(UserRequest.ModifyDNTI modifyDNTI) throws Exception;
//
//    //나의 지역 수정
//    void modifyAddress(UserRequest.ModifyAddress modifyAddress) throws Exception;

    //회원탈퇴
    void singOut(String userId) throws Exception;

    //닉네임 중복체크
    boolean hasNickname(String nickname) throws Exception;

    //회원 목록
    List<UserRequest.All> getList() throws Exception;

    //회원 정보 조회
    UserRequest.All getInfo(String userId) throws Exception;

//    UserRequest.MyPage getMypage(String userId) throws Exception;
}

