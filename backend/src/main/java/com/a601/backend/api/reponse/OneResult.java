package com.a601.backend.api.reponse;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OneResult<T> extends CommonResult {
    private T data;
}
