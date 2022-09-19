package com.a601.backend.api.controller;


import com.a601.backend.api.domain.dto.common.ApiResult;
import com.a601.backend.api.domain.dto.request.BoardRequest;

import com.a601.backend.api.service.BoardService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.AllArgsConstructor;


import org.springframework.web.bind.annotation.*;


@RestController
@Api(value = "동네게시판 API")
@RequestMapping("/board")
@AllArgsConstructor
public class BoardController {
    private final BoardService boardService;

    // 게시글 등록


    @ApiOperation(value = "게시글 등록", notes = "성공하면 게시글 id를 리턴")
    @PostMapping
    public ApiResult writeBoard(@RequestBody BoardRequest board) {
        // 성공하면 boardId 리턴
        return new ApiResult<>(200, boardService.writeBoard(board));
    }

    // 게시글 하나 조회
    @ApiOperation(value = "게시글 상세보기", notes = "성공하면 게시글 리턴")
    @GetMapping("/{boardId}")
    public ApiResult selectBoard(@PathVariable("boardId") Long boardId) {
        // 성공하면 board 리턴
        return new ApiResult(200, boardService.findByBoardId(boardId));
    }
    // 게시글 여러개 조회



    // 게시글 삭제
    @ApiOperation(value = "게시글 삭제", notes = "성공하면 삭제한 게시글 id 리턴")
    @DeleteMapping("/{boardId}")
    public ApiResult deleteBoard(@PathVariable("boardId") Long boardId) {
        boardService.deleteBoard(boardId);
        return new ApiResult(200, boardId);
    }

    // 게시글 수정
    @ApiOperation(value = "게시글 수정", notes = "성공하면 수정한 게시글 리턴")
    @PatchMapping("/{boardId}")
    public ApiResult modifyBoard(@RequestBody BoardRequest board, @PathVariable("boardId") Long boardId){
        boardService.modifyBoard(board, boardId);
        return new ApiResult(200, board);
    }
}
