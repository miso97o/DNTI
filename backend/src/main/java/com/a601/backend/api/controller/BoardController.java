package com.a601.backend.api.controller;


import com.a601.backend.api.domain.dto.common.ApiResult;
import com.a601.backend.api.domain.dto.request.BoardRequest;
import com.a601.backend.api.domain.entity.Board;

import com.a601.backend.api.repository.BoardRepository;
import com.a601.backend.api.service.BoardService;
import com.a601.backend.api.service.ResponseService;
import lombok.AllArgsConstructor;


import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/board")
@AllArgsConstructor
public class BoardController {
    private final BoardService boardService;
    private final ResponseService responseService;
    private final BoardRepository boardRepository;

    // 게시글 등록
    @PostMapping
    public ApiResult writeBoard(@RequestBody BoardRequest.WriteBoard writeBoard) {
        Board board = Board.builder().boardId(writeBoard.getBoardId()).user(writeBoard.getUser())
                .title(writeBoard.getTitle()).contents(writeBoard.getContents()).build();
        boardRepository.save(board);

        // 성공하면 boardId 리턴
        return new ApiResult<>(200, writeBoard.getBoardId());
    }
    
    // 게시글 하나 조회
    @GetMapping("/{boardId}")
    public ApiResult selectBoard(@PathVariable("boardId") Long boardId) {
        Board board = boardService.findByBoardId(boardId);
        return new ApiResult(200, board);
    }
}
