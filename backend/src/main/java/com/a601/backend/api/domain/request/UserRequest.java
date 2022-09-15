package com.a601.backend.api.domain.request;

import lombok.Getter;
import lombok.Setter;
import lombok.Builder;

import java.time.LocalDate;

public class UserRequest {
    @Getter
    @Setter
    @Builder
    public static class SingIn {
        String userId;
        String nickname;
        Integer birthYear;
        String gu;
        String dong;
    }

    @Getter
    @Setter
    @Builder
    public static class NicknameModify {
        String userId;
        String nickname;
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
