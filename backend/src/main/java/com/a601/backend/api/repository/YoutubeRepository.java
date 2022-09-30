package com.a601.backend.api.repository;

import com.a601.backend.api.domain.entity.Review;
import com.a601.backend.api.domain.entity.Youtube;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface YoutubeRepository extends JpaRepository<Youtube,Long> {
    List<Youtube> findAllByGu(String gu);
}
