package com.a601.backend.api.service;

import com.a601.backend.api.domain.entity.Youtube;

import java.util.List;

public interface YoutubeService {
    List<Youtube> getByGu(String gu);
}
