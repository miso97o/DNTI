package com.a601.backend.api.service;

import com.a601.backend.api.domain.dto.response.DntiResponse;
import com.a601.backend.api.domain.entity.Dnti;

import java.util.List;

public interface DntiService {
    void countDnti(String type);        //DNTI 개수 + 1
    DntiResponse getDnti(String type);
    List<DntiResponse> getAllDnti();            //전체 DNTI 조회

    Long getCount();                            //DNTI 응답자수
}
