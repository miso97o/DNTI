package com.a601.backend.api.service;

import com.a601.backend.api.domain.dto.request.FavoriteRequest;
import com.a601.backend.api.domain.dto.response.FavoriteResponse;
import com.a601.backend.api.domain.entity.Favorite;
import com.a601.backend.api.domain.entity.User;

import java.util.List;

public interface FavoriteService {
    //favorite 조회
    List<FavoriteResponse> getFavorite(String userId) throws Exception;

    //favorite 추가
    void addFavorite(FavoriteRequest favorite) throws Exception;

    //favorite 수정
    void modifyFavorite(FavoriteRequest favorite) throws Exception;

    //favorite 삭제
    void deleteFavorite(Long favoriteIde) throws Exception;

    //해당 회원의 즐겨찾기 개수가 3개 이하인지 여부
    boolean isUnder3(String userId) throws Exception;
}
