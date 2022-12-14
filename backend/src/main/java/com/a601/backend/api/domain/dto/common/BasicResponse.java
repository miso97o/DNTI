package com.a601.backend.api.domain.dto.common;

import com.a601.backend.api.domain.enums.ErrorCode;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
//@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class BasicResponse<T> {
    private boolean success;
    private T response;
    private ErrorCode error;
}