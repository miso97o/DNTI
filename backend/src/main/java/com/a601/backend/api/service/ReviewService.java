package com.a601.backend.api.service;

import com.a601.backend.api.domain.dto.request.ReviewRequest;
import com.a601.backend.api.domain.dto.response.ReviewResponse;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ReviewService {

    void saveReview(ReviewRequest reviewRequest);

    void deleteReview(Long id);

    List<ReviewResponse> reviewList(Pageable pageable);

    ReviewResponse detailReview(Long id);

    void updateReview(Long id,ReviewRequest reviewRequest);


    List<ReviewResponse> reviewTopList();
    ReviewResponse reviewScoreGu(String gu);

    List<ReviewResponse> reviewRecent(Long id,String gu);
    List<ReviewResponse> reviewSearch(String gu, String dong,String search,String word);

    //리뷰 좋아요 확인
    boolean isReviewLike(Long reviewId, String email);

    void reviewsaveLike(Long reviewLikeId,String email);
    void reviewdeleteLike(Long id,Long lid);
}
