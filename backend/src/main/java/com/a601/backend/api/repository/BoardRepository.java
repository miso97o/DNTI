package com.a601.backend.api.repository;

import com.a601.backend.api.domain.entity.Board;
import com.a601.backend.api.domain.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface BoardRepository  extends JpaRepository<Board, Long> {

    // boardId로 게시글 찾기
    Board findByBoardId(Long boardId);

    // 조회수 증가

    // 게시글 등록 => save메서드

    // 게시글 삭제 => delete메서드

    // 게시글 수정 => 좀 있다가
}
