package com.a601.backend.api.service;


import java.util.List;

public interface AddressService {
    //구 조회
    List<String> getGu();

    //동 조회
    List<String> getDong(String gu);
}
