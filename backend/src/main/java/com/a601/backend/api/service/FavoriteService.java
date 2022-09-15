package com.a601.backend.api.service;

import com.a601.backend.api.domain.dto.request.FavoriteRequest;
import com.a601.backend.api.domain.entity.Favorite;

import java.util.List;

public interface FavoriteService {
    //favorite 조회
    List<Favorite> getFavorite(String userId) throws Exception;

    //favorite 추가
    void addFavorite(FavoriteRequest favorite) throws Exception;

    //favorite 수정
    void modifyFavorite(FavoriteRequest favorite) throws Exception;

    //favorite 삭제
    void deleteFavorite(Integer favoriteIde) throws Exception;
}
