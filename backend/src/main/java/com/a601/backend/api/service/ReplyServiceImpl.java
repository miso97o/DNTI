package com.a601.backend.api.service;

import com.a601.backend.api.domain.dto.request.ReplyRequest;
import com.a601.backend.api.domain.dto.response.ReplyResponse;
import com.a601.backend.api.domain.entity.Board;
import com.a601.backend.api.domain.entity.Reply;
import com.a601.backend.api.domain.entity.User;
import com.a601.backend.api.domain.enums.ErrorCode;
import com.a601.backend.api.exception.CustomException;
import com.a601.backend.api.repository.BoardRepository;
import com.a601.backend.api.repository.ReplyRepository;
import com.a601.backend.api.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ReplyServiceImpl implements ReplyService{

    private final ReplyRepository replyRepository;
    private final BoardRepository boardRepository;
    private final UserRepository userRepository;


    // 댓글 쓰기
    @Override
    public Long writeReply(ReplyRequest.Create replyRequest) {
        User user = userRepository.getReferenceById(replyRequest.getEmail());
        Board board = boardRepository.getReferenceById(replyRequest.getBoardId());

        Reply reply = Reply.builder()
                .user(user)
                .board(board)
                .contents(replyRequest.getContents())
                .build();

        replyRepository.save(reply);
        return reply.getReplyId();
    }

    // 게시글별 댓글 조회
    @Override
    public Page<ReplyResponse> getReply(Long boardId, Pageable pageable) {
        return replyRepository.findReply(boardId, pageable).map(ReplyResponse::new);
    }

    // 댓글 수정
    @Override
    @Transactional
    public void modifyReply(Long replyId, ReplyRequest.Modify request) {
        Reply reply = replyRepository.findById(replyId).orElseThrow(() -> new CustomException(ErrorCode.POSTS_NOT_FOUND));
        if(reply.getUser().getEmail().equals(request.getEmail())){
            reply.modify(request.getContents());
        }
    }

    @Override
    public void deleteReply(Long replyId) {
        Reply reply = replyRepository.findById(replyId).orElseThrow(() -> new CustomException(ErrorCode.POSTS_NOT_FOUND));
        if(reply != null){
            replyRepository.delete(reply);
        }
    }
}
