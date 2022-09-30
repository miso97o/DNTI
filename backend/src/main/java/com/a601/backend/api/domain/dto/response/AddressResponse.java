package com.a601.backend.api.domain.dto.response;


import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

public class AddressResponse {
    @Getter
    @Setter
    @Builder
    public static class Gu{
        String gu;
    }

    @Getter
    @Setter
    @Builder
    public static class Dong{
        String dong;
    }
}
