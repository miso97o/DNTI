package com.a601.backend.api.service;

import com.a601.backend.api.domain.dto.request.BoardLikeRequest;
import com.a601.backend.api.domain.dto.request.BoardRequest;
import com.a601.backend.api.domain.dto.request.UserRequest;
import com.a601.backend.api.domain.dto.response.BoardResponse;
import com.a601.backend.api.domain.entity.Board;
import com.a601.backend.api.domain.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface BoardService {

   // 게시글 상세보기
   BoardResponse findByBoardId(Long boardId);

   // 게시글 여러개 보기
   Page<BoardResponse> findAllByOrderByCreatedTime(Pageable pageable);


   // 게시글 생성
   Long writeBoard(BoardRequest board);

   // 게시글 삭제
   void deleteBoard(Long boardId);

   // 게시글 수정
   void modifyBoard(BoardRequest board, Long boardId);

   // 조회수 증가
   void updateHit(Long boardId);

   // 제목으로 검색하기
   Page<BoardResponse> findByTitleContaining(String keyword, Pageable pageable);

   // 좋아요 등록
   void addBoardLike(BoardLikeRequest boardLikeRequest);

   // 좋아요 취소
   void cancelBoardLike(BoardLikeRequest boardLikeRequest);


}
