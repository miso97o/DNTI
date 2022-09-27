package com.a601.backend.api.domain.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Builder
@AllArgsConstructor
public class KmRequest {
    // 위도(38이하값)
    double lat;

    // 경도(127 그 부근)
    double lon;


}
