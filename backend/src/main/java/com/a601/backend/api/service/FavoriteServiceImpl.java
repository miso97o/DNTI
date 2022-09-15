package com.a601.backend.api.service;

import com.a601.backend.api.domain.dto.request.FavoriteRequest;
import com.a601.backend.api.domain.entity.Favorite;
import com.a601.backend.api.domain.entity.User;
import com.a601.backend.api.domain.enums.ErrorCode;
import com.a601.backend.api.exception.CustomException;
import com.a601.backend.api.repository.FavoriteRepository;
import com.a601.backend.api.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class FavoriteServiceImpl implements FavoriteService{

    private final UserRepository userRepository;
    private final FavoriteRepository favoriteRepository;

    @Override
    public List<Favorite> getFavorite(String userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new CustomException(ErrorCode.POSTS_NOT_FOUND));
        List<Favorite> list = favoriteRepository.findAllByUser(user);
        return list;
    }

    @Override
    public void addFavorite(FavoriteRequest request) {
        User user = userRepository.findById(request.getUserId()).orElseThrow(() -> new CustomException(ErrorCode.POSTS_NOT_FOUND));
        Favorite favorite = Favorite.builder()
                .user(user)
                .name(request.getName())
                .address(request.getAddress())
                .build();
        favoriteRepository.save(favorite);
    }

    @Override
    @Transactional
    public void modifyFavorite(FavoriteRequest request) {
        Favorite favorite = favoriteRepository.findById(request.getFavoriteId()).orElseThrow(() -> new CustomException(ErrorCode.POSTS_NOT_FOUND));
        favorite.modify(request.getName(), request.getAddress());
    }

    @Override
    @Transactional
    public void deleteFavorite(Integer favoriteId) {
        favoriteRepository.deleteById(favoriteId);
    }
}
