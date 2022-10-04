package com.a601.backend.api.domain.dto.response;

import com.a601.backend.api.domain.entity.Review;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReviewResponse {
    private Long id;
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

    private LocalDateTime createdTime;

    private LocalDateTime modifiedTime;

    @Builder
    private ReviewResponse(String gu,String dong,Double score,Integer rental,Integer infra,Integer environment,Integer safety,String nickname,LocalDateTime createdTime,LocalDateTime modifiedTime){
        this.gu=gu;
        this.dong=dong;
        this.score=score;
        this.rental=rental;
        this.infra=infra;
        this.environment=environment;
        this.safety=safety;
        this.nickname = nickname;
        this.createdTime=createdTime;
        this.modifiedTime=modifiedTime;
    }


    public ReviewResponse(Review review) {
        this.id = review.getReviewId();
        this.title = review.getTitle();
        this.email = review.getUser().getEmail();
        this.nickname = review.getUser().getNickname();
        this.gu = review.getGu();
        this.dong = review.getDong();
        this.content = review.getContent();
        this.score = review.getScore();
        this.reviewLike = review.getReviewLike();
        this.hit = review.getHit();
        this.rental = review.getRental();
        this.infra = review.getInfra();
        this.environment = review.getEnvironment();
        this.safety = review.getSafety();
    }
}
