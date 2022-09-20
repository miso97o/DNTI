package com.a601.backend.api.repository;

import com.a601.backend.api.domain.entity.ReviewLike;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewLikeRepository extends JpaRepository<ReviewLike,Long> {

}
