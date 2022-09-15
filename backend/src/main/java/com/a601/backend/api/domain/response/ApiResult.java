package com.a601.backend.api.domain.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ApiResult<T>{
    private final int status;
    private final T response;

    public ApiResult(int status, T response) {
        this.status = status;       // 코드
        this.response = response;   //성공이면 값, 실패면 에러객체
    }
}