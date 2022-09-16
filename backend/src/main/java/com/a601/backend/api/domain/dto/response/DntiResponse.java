package com.a601.backend.api.domain.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DntiResponse {
    String dnti;
    long count;
    long totalCount;
}
