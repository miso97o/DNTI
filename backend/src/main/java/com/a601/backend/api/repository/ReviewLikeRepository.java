package com.a601.backend.api.repository;

import com.a601.backend.api.domain.entity.ReviewLike;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewLikeRepository extends JpaRepository<ReviewLike,Long> {
    //내가 좋아요 누른 글인지 여부
    Boolean existsByReview_ReviewIdAndUser_Email(Long reviewId, String email);
}
