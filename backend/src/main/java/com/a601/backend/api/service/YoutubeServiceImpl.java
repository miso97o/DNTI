package com.a601.backend.api.service;

import com.a601.backend.api.domain.entity.Youtube;
import com.a601.backend.api.repository.YoutubeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class YoutubeServiceImpl implements YoutubeService{

    private final YoutubeRepository youtubeRepository;

    @Override
    public List<Youtube> getByGu(String gu) {
        return youtubeRepository.findAllByGu(gu);
    }
}
