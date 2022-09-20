package com.a601.backend.api.repository;

import com.a601.backend.api.domain.entity.BoardLike;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoardLikeRepository extends JpaRepository<BoardLike, Long> {
}
