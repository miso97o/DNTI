package com.a601.backend.api.service;

import com.a601.backend.api.domain.dto.response.DongScore;

import java.util.List;

public interface DongService {
    //동네 점수 계산
    List<DongScore> computeDongScore(List<Integer> priorities, String gu);
    List<DongScore> computeDongScoreByDnti(String dnti);
}
