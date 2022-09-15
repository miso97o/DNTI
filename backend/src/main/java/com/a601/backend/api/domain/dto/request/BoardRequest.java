package com.a601.backend.api.domain.dto.request;


import com.a601.backend.api.domain.entity.User;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

public class BoardRequest {

    @Getter
    @Setter
    @Builder
    public static class WriteBoard{
        Long boardId;
        User user;
        String nickname;
        String title;
        String contents;
        Integer hit;
        Integer boardLike;
    }

}
