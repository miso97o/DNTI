package com.a601.backend.api.domain.dto.request;

import lombok.Getter;
import lombok.Setter;
import lombok.Builder;

public class UserRequest {
    @Getter
    @Setter
    @Builder
    public static class NicknameModify {
        String userId;
        String nickName;
    }

    @Getter
    @Setter
    @Builder
    public static class DNTIModify {
        String userId;
        String dnti;
    }

    @Getter
    @Setter
    @Builder
    public static class AddressModify {
        String userId;
        String gu;
        String dong;
    }

    @Getter
    @Setter
    @Builder
    public static class Favorite {
        String userId;
        String favorite;
    }

    @Getter
    @Setter
    @Builder
    public static class SignOut{
        private String memberId;
    }

}
