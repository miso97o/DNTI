package com.a601.backend.api.repository;

import com.a601.backend.api.domain.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review,Long> {

    List<Review> findAllByOrderByCreatedTimeAsc();
}
