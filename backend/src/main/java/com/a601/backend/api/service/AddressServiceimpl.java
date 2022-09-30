package com.a601.backend.api.service;

import com.a601.backend.api.domain.dto.response.AddressResponse;
import com.a601.backend.api.domain.entity.Dong;
import com.a601.backend.api.domain.entity.Gu;
import com.a601.backend.api.repository.DongRepository;
import com.a601.backend.api.repository.GuRepository;
import com.a601.backend.api.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class AddressServiceimpl implements AddressService {
    private final GuRepository guRepository;
    private final DongRepository dongRepository;


    @Override
    public List<String> getGu() {
        List<Gu> list = guRepository.findAll();

        List<String> result = new ArrayList<>();
        for(Gu gu : list){
            result.add(gu.getGuName());
        }

        return result;
    }

    @Override
    public List<String> getDong(String gu) {
        List<Dong> list = dongRepository.findAllByGu_GuName(gu);

        List<String> result = new ArrayList<>();
        for(Dong dong : list){
            result.add(dong.getDong());
        }

        return result;
    }
}
