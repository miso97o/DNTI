package com.a601.backend.api.service;

import com.a601.backend.api.domain.request.UserRequest;

public interface UserService {
    //회원가입
    String singIn(UserRequest.SingIn singIn);


    //닉네임 중복체크
    boolean hasNickname(String nickname);

    //
}
