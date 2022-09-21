package com.a601.backend.api.domain.dto.response;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DntiResponse {
    String type;
    Long count;
    double  percent;     //전체중 몇퍼센트의 성향
    String hashtag1;
    String hashtag2;
}
