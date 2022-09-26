package com.a601.backend.api.repository;

import com.a601.backend.api.domain.entity.Review;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review,Long> {

    List<Review> findAllByOrderByCreatedTimeDesc(Pageable pageable);

    List<Review>findTop3ByOrderByHitDesc();

    List<Review>findAllByGuOrderByCreatedTimeDesc(String gu);
    List<Review>findAllByGuOrderByHitDesc(String gu);

    List<Review>findAllByTitleContainingOrderByCreatedTimeDesc(String title);
    List<Review>findAllByContentContainingOrderByCreatedTimeDesc(String content);
    @Query("select r from Review r where r.user.email = :email order by r.createdTime Desc")
    List<Review>findAllUserReview(@Param("email") String email);

}
