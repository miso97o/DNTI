package com.a601.backend.api.domain.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class GoogleResponse {
    String email;
    boolean flag;
    String domain;
}
