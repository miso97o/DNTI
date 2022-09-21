package com.a601.backend.api.domain.dto.request;

import lombok.Builder;
import lombok.Getter;

public class ReplyRequest {


    @Getter
    @Builder
    public static class Create{
        String email;
        Long boardId;
        String contents;
    }

    @Getter
    @Builder
    public static class Modify{
        String email;
        String contents;
    }
}
