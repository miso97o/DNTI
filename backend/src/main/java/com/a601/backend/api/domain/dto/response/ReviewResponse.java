package com.a601.backend.api.domain.dto.response;

import com.a601.backend.api.domain.entity.ReviewLike;
import com.a601.backend.api.domain.entity.User;
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

    private String title;
    private String email;
    private String nickname;
    private String gu;
    private String dong;
    private String content;
    private Double score;
    private Integer reviewLike;
    private Integer hit;
    private Integer rental;
    private Integer infra;
    private Integer environment;
    private Integer safety;

    @Builder
    private ReviewResponse(String gu,String dong,Double score,Integer rental,Integer infra,Integer environment,Integer safety,String nickname){
        this.gu=gu;
        this.dong=dong;
        this.score=score;
        this.rental=rental;
        this.infra=infra;
        this.environment=environment;
        this.safety=safety;
        this.nickname = nickname;
    }
}
