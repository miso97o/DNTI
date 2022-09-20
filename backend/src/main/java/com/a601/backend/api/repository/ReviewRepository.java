package com.a601.backend.api.repository;

import com.a601.backend.api.domain.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review,Long> {

    List<Review> findAllByOrderByCreatedTimeDesc();

    List<Review>findTop3ByOrderByHitDesc();

    List<Review>findAllByGu(String gu);
    List<Review>findAllByGuOrderByCreatedTimeDesc(String gu);
    List<Review>findAllByGuOrderByHitDesc(String gu);

    List<Review>findAllByTitleOrderByCreatedTimeDesc(String title);

}
