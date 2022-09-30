package com.a601.backend.api.domain.dto.response;

import com.a601.backend.api.domain.entity.Board;
import com.a601.backend.api.domain.entity.BoardLike;
import com.a601.backend.api.domain.entity.Reply;
import com.a601.backend.api.domain.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Getter
@Builder
@AllArgsConstructor
public class BoardResponse {

    private Long boardId;

    private String email;

    private String nickname;

    private String gu;
    private String dong;

    private String title;

    private String contents;

    private Long hit;

    private Long boardLike;

    private Integer commentCount;

    private LocalDateTime createdTime;

    private LocalDateTime modifiedTime;

    public BoardResponse(Board entity){
        this.boardId = entity.getBoardId();
        this.email = entity.getUser().getEmail();
        this.nickname = entity.getUser().getNickname();
        //작성시에는 유저의 구/동, 수정및 조회시에는 저장된 구/동 가져오기
        if(entity.getGu()==null){
            this.gu = entity.getUser().getGu();
        } else{
            this.gu = entity.getGu();
        }

        if(entity.getDong()==null){
            this.dong = entity.getUser().getDong();
        } else{
            this.dong = entity.getDong();
        }
        this.title = entity.getTitle();
        this.contents = entity.getContents();
        this.hit = entity.getHit();
        this.boardLike = entity.getBoardLike();
        this.commentCount = entity.getReplyList().size();
        this.createdTime = entity.getCreatedTime();
        this.modifiedTime =entity.getModifiedTime();
    }


}
