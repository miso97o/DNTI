package com.a601.backend.api.repository;

import com.a601.backend.api.domain.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review,Long> {

    List<Review> findAllByOrderByCreatedTimeDesc();

    List<Review>findTop3ByOrderByHitDesc();

    List<Review>findAllByGuOrderByCreatedTimeDesc(String gu);
    List<Review>findAllByGuOrderByHitDesc(String gu);

    List<Review>findAllByTitleContaining(String title);
    List<Review>findAllByContentContaining(String content);
    @Query("select r from Review r where r.user.email = :email")
    List<Review>findAllUserReview(@Param("email") String email);

}
