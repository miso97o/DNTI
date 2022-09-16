package com.a601.backend.api.service;

import com.a601.backend.api.domain.dto.response.DntiResponse;
import com.a601.backend.api.domain.entity.Dnti;

import java.util.List;

public interface DntiService {
    void countDnti(String dnti);        //DNTI 개수 + 1
    DntiResponse getDntiCnt(String dnti);       //현재 DNTI 개수
    List<Dnti> getAllDnti();            //전체 DNTI 조회
}
