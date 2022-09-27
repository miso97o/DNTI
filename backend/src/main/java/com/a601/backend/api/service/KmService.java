package com.a601.backend.api.service;

import com.a601.backend.api.domain.dto.response.KmResponse;
import com.a601.backend.api.domain.entity.Km;

import java.util.List;

public interface KmService {

    // 위도(lat), 경도(lon)
    List<KmResponse> calculateKm(double lat, double log);
}
