package com.a601.backend.api.repository;

import com.a601.backend.api.domain.entity.Board;
import com.a601.backend.api.domain.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface BoardRepository  extends JpaRepository<Board, Long> {

    // 게시글 전체 조회
    Page<Board> findAllByOrderByCreatedTimeDesc(Pageable pageable);

    //핫한 게시물 3개 조회+구,필터
    List<Board> findTop3ByGuContainingAndDongContainingOrderByHitDesc(String gu, String dong);

    // 제목으로 찾기
    Page<Board> findByGuContainingAndDongContainingAndTitleContainingOrderByCreatedTimeDesc(String gu, String dong,String keyword, Pageable pageable);

    // 내용으로 찾기
    Page<Board> findByGuContainingAndDongContainingAndContentsContainingOrderByCreatedTimeDesc(String gu, String dong,String keyword, Pageable pageable);

    // 유저 email로 조회
    Page<Board> findByGuContainingAndDongContainingAndUser_EmailContainingOrderByCreatedTimeDesc(String gu, String dong,String keyword, Pageable pageable);

    // 내가 쓴글 상위 3개
    List<Board> findTop3ByUser_EmailContainingOrderByCreatedTimeDesc(String email);
}
