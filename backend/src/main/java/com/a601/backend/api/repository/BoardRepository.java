package com.a601.backend.api.repository;

import com.a601.backend.api.domain.entity.Board;
import com.a601.backend.api.domain.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BoardRepository  extends JpaRepository<Board, Long> {

    // 일치하는 제목을 가진 게시글 가져오기
    List<Board> findAllByTitle(String title);
    // 일치하는 유저가 쓴 게시글 가져오기
    List<User> findAllByUser(String user);
}
