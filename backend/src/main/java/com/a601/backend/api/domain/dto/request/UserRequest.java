package com.a601.backend.api.domain.dto.request;

import lombok.Getter;
import lombok.Setter;
import lombok.Builder;

import java.time.LocalDate;

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
