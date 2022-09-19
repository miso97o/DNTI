package com.a601.backend.api.repository;

import com.a601.backend.api.domain.dto.request.FavoriteRequest;
import com.a601.backend.api.domain.entity.Favorite;
import com.a601.backend.api.domain.entity.User;
import io.swagger.models.auth.In;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FavoriteRepository extends JpaRepository<Favorite, Long> {
    //유저아이디로 즐겨찾기 개수 조회
    Integer countAllByUser(User user);


    //유저아이디로 즐겨찾기 목록 조회
    List<Favorite> findAllByUser(User user);
}
