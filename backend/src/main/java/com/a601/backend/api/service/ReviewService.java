package com.a601.backend.api.service;

import com.a601.backend.api.domain.dto.request.ReviewRequest;
import com.a601.backend.api.domain.dto.response.ReviewResponse;

import java.util.List;

public interface ReviewService {

    ReviewResponse saveReview(ReviewRequest reviewRequest, String email);

    void deleteReview(Long id);

    List<ReviewResponse> reviewList();

    ReviewResponse detailReview(Long id);

    ReviewResponse updateReview(Long id,ReviewRequest reviewRequest);
}
