package com.a601.backend.api.repository;

import com.a601.backend.api.domain.entity.Board;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BoardRepository  extends JpaRepository<Board, Long> {
}
