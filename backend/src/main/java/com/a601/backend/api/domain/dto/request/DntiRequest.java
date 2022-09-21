package com.a601.backend.api.domain.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
public class DntiRequest {
    String type;
    Double percent;     //전체중 몇퍼센트의 성향
    String hashtag1;
    String hashtag2;
}
