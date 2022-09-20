package com.a601.backend.api.service;

import com.a601.backend.api.domain.dto.response.DntiResponse;
import com.a601.backend.api.domain.entity.Dnti;
import com.a601.backend.api.repository.DntiRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class DntiServiceImpl implements DntiService{

    @Autowired
    DntiRepository dntiRepository;

    //해당 유형 사람수 1 증가
    @Override
    @Transactional
    public void countDnti(String type) {
        Dnti tmp = dntiRepository.getReferenceById(type);
        tmp.setCount(tmp.getCount()+1);
        dntiRepository.save(tmp);
    }

    //해당 dnti 유형 정보
    @Override
    public DntiResponse getDnti(String type) {
        List<Dnti> list = dntiRepository.findAll();
        Dnti cur = dntiRepository.getReferenceById(type);
        long sum = 0;
        for(Dnti el : list) sum += el.getCount();
        return new DntiResponse(type, cur.getCount(), (cur.getCount()/sum)*100, cur.getHashtag1(), cur.getHashtag2());
    }

    @Override
    public List<DntiResponse> getAllDnti() {
        List<Dnti> list = dntiRepository.findAll();
        List<DntiResponse> result = new ArrayList<>();

        for(Dnti el : list) {
            long sum = 0;
            sum += el.getCount();
            result.add(new DntiResponse(el.getType(), el.getCount(), (el.getCount()/sum)*100, el.getHashtag1(), el.getHashtag2()));
        }
        return result;
    }
}
