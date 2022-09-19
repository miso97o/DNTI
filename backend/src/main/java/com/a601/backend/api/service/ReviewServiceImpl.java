package com.a601.backend.api.service;

import com.a601.backend.api.domain.dto.request.ReviewRequest;
import com.a601.backend.api.domain.dto.response.ReviewResponse;
import com.a601.backend.api.domain.entity.Review;
import com.a601.backend.api.domain.entity.ReviewLike;
import com.a601.backend.api.domain.entity.User;
import com.a601.backend.api.domain.enums.KeywordType;
import com.a601.backend.api.repository.ReviewRepository;
import com.a601.backend.api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReviewServiceImpl implements ReviewService{

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ReviewRepository reviewRepository;

    @Override
    public ReviewResponse saveReview(ReviewRequest reviewRequest, String email) {
        User user=userRepository.findByEmail(email).get();
        Review review= Review.builder()
                .user(user)
                .dong(user.getDong())
                .content(reviewRequest.getContent())
                .score(0.0)
                .reviewLike(0)
                .keyword(reviewRequest.getKeyword())
                .build();
        reviewRepository.save(review);
        ReviewResponse reviewResponse=ReviewResponse.builder()
                .email(email)
                .dong(user.getDong())
                .content(review.getContent())
                .score(0.0)
                .reviewLike(0)
                .keyword(reviewRequest.getKeyword())
                .build();
        return reviewResponse;
    }

    @Override
    public void deleteReview(Long id) {
        reviewRepository.deleteById(id);
        return;
    }

    @Override
    public List<ReviewResponse> reviewList() {
        List<ReviewResponse>reviewList=reviewRepository.findAllByOrderByCreatedTimeAsc()
                .stream()
                .map(review -> ReviewResponse.builder()
                        .email(review.getUser().getEmail())
                        .dong(review.getDong())
                        .content(review.getContent())
                        .score(review.getScore())
                        .reviewLike(review.getReviewLike())
                        .keyword(review.getKeyword())
                        .build()).collect(Collectors.toList());

        return reviewList;
    }

    @Override
    public ReviewResponse detailReview(Long id) {
        Review review=reviewRepository.findById(id).get();
        ReviewResponse reviewResponse=ReviewResponse.builder()
                .email(review.getUser().getEmail())
                .dong(review.getUser().getDong())
                .content(review.getContent())
                .score(review.getScore())
                .reviewLike(review.getReviewLike())
                .keyword(review.getKeyword())
                .build();
        return reviewResponse;
    }

    @Override
    public ReviewResponse updateReview(Long id,ReviewRequest reviewRequest) {
        Review review=reviewRepository.findById(id).get();
        review.setContent(reviewRequest.getContent());
        review.setModifiedTime(review.getCreatedTime());
        reviewRepository.save(review);

        ReviewResponse reviewResponse=ReviewResponse.builder()
                .email(review.getUser().getEmail())
                .dong(review.getUser().getDong())
                .content(review.getContent())
                .score(review.getScore())
                .reviewLike(review.getReviewLike())
                .keyword(review.getKeyword())
                .build();
        return reviewResponse;
    }


}
