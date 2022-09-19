package com.a601.backend.api.domain.dto.response;

import com.a601.backend.api.domain.entity.ReviewLike;
import com.a601.backend.api.domain.entity.User;
import com.a601.backend.api.domain.enums.KeywordType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReviewResponse {


    private String email;
    private String dong;
    private String content;
    private Double score;
    private Integer reviewLike;
    private KeywordType keyword;
}
