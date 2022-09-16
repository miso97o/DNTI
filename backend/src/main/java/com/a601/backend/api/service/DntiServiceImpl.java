package com.a601.backend.api.service;

import com.a601.backend.api.domain.dto.response.DntiResponse;
import com.a601.backend.api.domain.entity.Dnti;
import com.a601.backend.api.repository.DntiRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DntiServiceImpl implements DntiService{

    @Autowired
    DntiRepository dntiRepository;

    @Override
    public void countDnti(String dnti) {
        Dnti tmp = dntiRepository.getReferenceById(dnti);
        tmp.setCount(tmp.getCount()+1);
        dntiRepository.save(tmp);
    }

    @Override
    public DntiResponse getDntiCnt(String dnti) {
        List<Dnti> list = dntiRepository.findAll();
        Dnti cur = dntiRepository.getReferenceById(dnti);
        long sum = 0;
        for(Dnti el : list) sum += el.getCount();
        return new DntiResponse(dnti, cur.getCount(), sum);
    }

    @Override
    public List<Dnti> getAllDnti() {
        return dntiRepository.findAll();
    }


}
