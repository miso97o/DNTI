package com.a601.backend.api.repository;

import com.a601.backend.api.domain.entity.Board;
import com.a601.backend.api.domain.entity.Reply;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ReplyRepository extends JpaRepository<Reply, Long> {

    // 게시글별 댓글 목록 조회
    @Query("select reply from Reply reply where reply.board.boardId = :boardId")
    Page<Reply> findReply(@Param("boardId") Long boardId, Pageable pageable);
}
