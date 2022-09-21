package com.a601.backend.api.controller;

import com.a601.backend.api.domain.dto.common.ApiResult;
import com.a601.backend.api.domain.dto.request.ReplyRequest;
import com.a601.backend.api.domain.dto.response.ReplyResponse;
import com.a601.backend.api.service.ReplyService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@RestController
@Api(value = "동네게시판 댓글 API")
@RequestMapping("/reply")
@AllArgsConstructor
public class ReplyController {
    private final ReplyService replyService;

    // 댓글 등록
    @ApiOperation(value = "댓글 등록", notes = "성공하면 등록된 댓글 id 리턴")
    @PostMapping
    public ApiResult writeReply(@RequestBody ReplyRequest.Create request) {
        return new ApiResult(200, replyService.writeReply(request));
    }

    // 게시글별 댓글 조회
    @ApiOperation(value = "게시글별 댓글 조회", notes = "Page객체로 댓글 목록 리턴")
    @GetMapping("/{boardId}")
    public ApiResult getReply(@PathVariable("boardId") Long boardId, Pageable pageable) {
        return new ApiResult(200, replyService.getReply(boardId, pageable));
    }

    // 댓글 수정
    @ApiOperation(value = "댓글 수정", notes = "댓글 내용 수정")
    @PatchMapping("/{replyId}")
    public ApiResult modifyReply(@PathVariable("replyId") Long replyId, ReplyRequest.Modify request) {
        replyService.modifyReply(replyId, request);
        return new ApiResult(200, replyId);
    }

    // 댓글 삭제
    @ApiOperation(value = "댓글 삭제", notes = "성공하면 삭제된 댓글 id리턴")
    @DeleteMapping("/{replyId}")
    public ApiResult deleteReply(@PathVariable("replyId") Long replyId) {
        replyService.deleteReply(replyId);
        return new ApiResult(200, replyId);
    }

}
