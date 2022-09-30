package com.a601.backend.api.repository;

import com.a601.backend.api.domain.entity.ReviewLike;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewLikeRepository extends JpaRepository<ReviewLike,Long> {
    //내가 좋아요 누른 글인지 여부
    Boolean existsByUser_EmailAndReview_ReviewId(String email, Long reviewId);


    //좋아요 삭제
    void deleteByUser_EmailAndReview_ReviewId(String email,Long reviewId);
}
