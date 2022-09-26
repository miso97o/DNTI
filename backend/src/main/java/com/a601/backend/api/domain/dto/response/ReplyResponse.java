package com.a601.backend.api.domain.dto.response;

import com.a601.backend.api.domain.entity.Reply;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;

import java.time.LocalDateTime;

@Data
@Getter
@Builder
@AllArgsConstructor
public class ReplyResponse {

    private Long replyId;
    private String email;
    private Long boardId;
    private String contents;
    private LocalDateTime createdTime;
    private LocalDateTime modifiedTime;

    public ReplyResponse(Reply entity){
        this.replyId = entity.getReplyId();
        this.email= entity.getUser().getEmail();
        this.boardId = entity.getBoard().getBoardId();
        this.contents = entity.getContents();
        this.createdTime = entity.getCreatedTime();
        this.modifiedTime = entity.getModifiedTime();
    }

}
