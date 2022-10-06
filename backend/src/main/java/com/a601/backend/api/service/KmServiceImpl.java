package com.a601.backend.api.service;

import com.a601.backend.api.domain.dto.response.KmResponse;
import com.a601.backend.api.repository.KmRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class KmServiceImpl implements KmService {

    private final KmRepository kmRepository;


    @Override
    public List<KmResponse> calculateKm(double lat, double lon) {
        List<KmResponse> result = kmRepository.getkmdata(lat, lon).stream().map(km -> KmResponse.builder()
                .type(km.getType())
                .name(km.getName())
                .lat(km.getLat()).lon(km.getLon()).address(km.getAddress()).build()).collect(Collectors.toList());
        return result;
    }



}

