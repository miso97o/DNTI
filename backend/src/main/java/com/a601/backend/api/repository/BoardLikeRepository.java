package com.a601.backend.api.repository;

import com.a601.backend.api.domain.entity.BoardLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface BoardLikeRepository extends JpaRepository<BoardLike, Long> {
    //내가 좋아요 누른 글인지 여부
    Boolean existsByBoard_BoardIdAndUser_Email(Long boardId, String email);
    
    // boardId와 email이 일치하는 boardlike 조회
    @Query("SELECT board_like from BoardLike board_like where board_like.user.email = :email AND board_like.board.boardId = :boardId")
    BoardLike findByEmailAndBoardId(@Param("email") String email, @Param("boardId") Long boardId);
}
