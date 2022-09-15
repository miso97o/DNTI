package com.a601.backend.api.domain.dto.response;


import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ManyResult<T> extends CommonResult {
    private List<T> data;

}
