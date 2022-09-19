package com.a601.backend.api.domain.dto.request;

import com.a601.backend.api.domain.entity.ReviewLike;
import com.a601.backend.api.domain.entity.User;
import com.a601.backend.api.domain.enums.KeywordType;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Builder
@Data
@AllArgsConstructor
public class ReviewRequest {

    private String content;
    private KeywordType keyword;
    private LocalDateTime createdTime;
}
