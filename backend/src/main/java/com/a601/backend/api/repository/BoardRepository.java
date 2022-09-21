package com.a601.backend.api.repository;

import com.a601.backend.api.domain.dto.request.UserRequest;
import com.a601.backend.api.domain.dto.response.BoardResponse;
import com.a601.backend.api.domain.entity.Board;
import com.a601.backend.api.domain.entity.Review;
import com.a601.backend.api.domain.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface BoardRepository  extends JpaRepository<Board, Long> {

    // 게시글 전체 조회
    Page<Board> findAllByOrderByCreatedTimeDesc(Pageable pageable);
    
    // 제목으로 찾기
    Page<Board> findByTitleContainingOrderByCreatedTimeDesc(String keyword, Pageable pageable);

    // 내용으로 찾기
    Page<Board> findByContentsContainingOrderByCreatedTimeDesc(String keyword, Pageable pageable);

    // 유저 email로 조회
    @Query("select board from Board board where board.user.email = :email")
    List<Board> findMyBoard(@Param("email") String email);


}
