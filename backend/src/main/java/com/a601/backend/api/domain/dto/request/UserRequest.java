package com.a601.backend.api.domain.dto.request;

import com.a601.backend.api.domain.dto.response.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

public class UserRequest {
    @Getter
    @Setter
    @Builder
    public static class All{
        String userId;
        String nickname;
        Integer birthYear;
        String gu;
        String dong;
        String dnti;
    }

    @Getter
    @Setter
    @Builder
    @AllArgsConstructor
    public static class MyPage {
        UserRequest.All user;
        DntiResponse dntiRequest;

        List<DongScore> dongList;
        List<FavoriteResponse> favoriteList;
        List<ReviewResponse> reviewList;
        List<BoardResponse> boardList;
    }

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
    public static class ModifyAll {
        String userId;
        String nickname;
        Integer birthYear;
        String gu;
        String dong;
    }

    @Getter
    @Setter
    @Builder
    public static class ModifyDNTI {
        String userId;
        String dnti;
    }

    @Getter
    @Setter
    @Builder
    public static class ModifyAddress {
        String userId;
        String gu;
        String dong;
    }



}
