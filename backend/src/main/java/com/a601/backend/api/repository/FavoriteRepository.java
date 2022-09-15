package com.a601.backend.api.repository;

import com.a601.backend.api.domain.dto.request.FavoriteRequest;
import com.a601.backend.api.domain.entity.Favorite;
import com.a601.backend.api.domain.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FavoriteRepository extends JpaRepository<Favorite, Integer> {
    //유저아이디로 조회
    List<Favorite> findAllByUser(User user);
}
