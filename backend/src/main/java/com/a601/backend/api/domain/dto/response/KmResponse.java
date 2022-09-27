package com.a601.backend.api.domain.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;

@Data
@Getter
@Builder
@AllArgsConstructor
public class KmResponse {

    String type;
    String name;
    double lat;
    double lon;
    String address;
}
