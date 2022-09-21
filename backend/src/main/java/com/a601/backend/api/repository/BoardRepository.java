package com.a601.backend.api.repository;

import com.a601.backend.api.domain.dto.request.UserRequest;
import com.a601.backend.api.domain.dto.response.BoardResponse;
import com.a601.backend.api.domain.entity.Board;
import com.a601.backend.api.domain.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface BoardRepository  extends JpaRepository<Board, Long> {

    // 게시글 전체 조회
    Page<Board> findAllByOrderByCreatedTimeDesc(Pageable pageable);
    
    // 제목으로 찾기
    Page<Board> findByTitleContainingOrderByCreatedTimeDesc(String keyword, Pageable pageable);

    // 유저id로 조회
    Page<Board> findByUserOrderByCreatedTimeDesc(UserRequest user, Pageable pageable);
}
