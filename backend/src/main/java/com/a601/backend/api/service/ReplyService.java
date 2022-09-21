package com.a601.backend.api.service;

import com.a601.backend.api.domain.dto.request.ReplyRequest;
import com.a601.backend.api.domain.dto.response.ReplyResponse;
import com.a601.backend.api.domain.entity.Reply;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ReplyService {


    // 댓글 등록
    Long writeReply(ReplyRequest.Create replyRequest);

    // 댓글 목록 조회
    Page<ReplyResponse> getReply(Long boardId, Pageable pageable);

    // 댓글 수정
    void modifyReply(Long replyId, ReplyRequest.Modify request);

    // 댓글 삭제
    void deleteReply(Long replyId);
}
