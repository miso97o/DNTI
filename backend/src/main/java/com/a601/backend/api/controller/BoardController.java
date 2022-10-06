package com.a601.backend.api.controller;


import com.a601.backend.api.domain.dto.common.ApiResult;
import com.a601.backend.api.domain.dto.request.BoardLikeRequest;
import com.a601.backend.api.domain.dto.request.BoardRequest;
import com.a601.backend.api.domain.dto.response.BoardResponse;
import com.a601.backend.api.domain.entity.Board;

import com.a601.backend.api.domain.enums.ErrorCode;
import com.a601.backend.api.exception.CustomException;
import com.a601.backend.api.service.BoardService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.AllArgsConstructor;


import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin("*")
@Api(value = "자유게시판 API", tags = {"자유게시판"})
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
    @ApiOperation(value = "게시글 상세보기", notes = "성공하면 게시글 리턴 + 해당 게시글 좋아요 여부")
    @GetMapping("/{boardId}")
    public ApiResult selectBoard(@PathVariable("boardId") Long boardId) {
        // 성공하면 board 리턴
        return new ApiResult(200, boardService.findByBoardId(boardId));
    }

    // 게시글 여러 개 조회
    @ApiOperation(value = "게시글 전체 조회", notes = "0번페이지부터 시작, 가장 최근에 작성된 글이 먼저 나옴")
    @GetMapping
    public ApiResult selectBoardList(Pageable pageable) {
        return new ApiResult(200, boardService.findAllByOrderByCreatedTime(pageable));
    }

    // 키워드로 게시글 조회
    @ApiOperation(value = "구, 동 및 검색필터 조회", notes = "검색어를 포함한 제목(0)/내용(1)/아이디(2)을 가진 게시글 조회(최신순) +구, 동(검색어 및 구, 동은 보내지 않을 시 자동으로 전체검색)")
    @GetMapping("/search")
    public ApiResult selectBoardListByKeyword(@RequestParam(required = false) String gu, @RequestParam(required = false) String dong, @RequestParam Long category, @RequestParam(required = false) String keyword, Pageable pageable) {
        //구, 동 필터(없으면 전체검색)
        if(gu==null) gu ="";
        if(dong==null) dong="";

        //키워드 없으면 전체 검색
        if(keyword==null) keyword="";
        return new ApiResult(200, boardService.searchBoard(gu, dong, category, keyword, pageable));
    }

    //핫한 게시물 3개 조회(구, 동 필터)
    @ApiOperation(value = "핫한 게시물 3개 조회(구, 동 필터)", notes = "like 많은 순으로 핫한 게시물 최대 3개 조회")
    @GetMapping("/hot")
    public ApiResult selectBoardListByKeyword(@RequestParam(required = false) String gu, @RequestParam(required = false) String dong) {
        //구, 동 필터(없으면 전체검색)
        if(gu==null) gu ="";
        if(dong==null) dong="";

        return new ApiResult(200, boardService.getHot3Board(gu, dong));
    }

    // 내가 쓴 게시글 조회
    @ApiOperation(value = "내가 쓴 게시글 3개 조회", notes = "성공하면 게시글 최신 3개 list 리턴")
    @GetMapping("/my-board/{email}")
    public ApiResult getMyBoard(@PathVariable("email") String email){
        return new ApiResult(200, boardService.getMyBoard(email));
    }


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
    public ApiResult modifyBoard(@RequestBody BoardRequest.modify board, @PathVariable("boardId") Long boardId) {
        boardService.modifyBoard(board, boardId);
        return new ApiResult(200, board);
    }

    // 조회수 증가
    @ApiOperation(value = "조회수 1증가", notes = "성공하면 업데이트 된 게시글 id리턴")
    @PatchMapping("/hit/{boardId}")
    public ApiResult increaseHit(@PathVariable("boardId") Long boardId) {
        boardService.updateHit(boardId);
        return new ApiResult(200, boardId);
    }

    @ApiOperation(value = "게시물 좋아요 눌렀는지 여부", notes = "해당 아이디가 해당 게시물 좋아요를 눌렀는지 여부(눌렀으면 true, 아니면 false)")
    @GetMapping("/like")
    public ApiResult isBoardLike(@RequestParam Long boardId, @RequestParam  String email) {
        return new ApiResult(200, boardService.isBoardLike(boardId, email));
    }

    @ApiOperation(value = "좋아요 등록", notes = "성공하면 업데이트 된 게시글 id리턴")
    @PatchMapping("/increase-like")
    public ApiResult addBoardLike(@RequestBody BoardLikeRequest boardLike) {
        //좋아요 중복 등록 방지
        if(boardService.isBoardLike(boardLike.getBoardId(), boardLike.getEmail())){
            throw new CustomException(ErrorCode.METHOD_NOT_ALLOWED);
        }

        boardService.addBoardLike(boardLike);
        return new ApiResult(200, boardLike.getBoardId());
    }

    @ApiOperation(value = "좋아요 취소", notes = "성공하면 삭제된 된 게시글 id리턴")
    @PatchMapping("/decrease-like")
    public ApiResult cancelBoardLike(@RequestBody BoardLikeRequest boardLike) {
        //좋아요 없는데 취소 안되게
        if(!boardService.isBoardLike(boardLike.getBoardId(), boardLike.getEmail())){
            throw new CustomException(ErrorCode.METHOD_NOT_ALLOWED);
        }

        boardService.cancelBoardLike(boardLike);
        return new ApiResult(200, boardLike.getBoardId());
    }
}
