package com.a601.backend.api.domain.entity;

import com.a601.backend.api.domain.enums.KeywordType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
public class Review extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reviewId;

    @JoinColumn(name = "user_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private User user;

    @Column(length = 10)
    private String dong;

    @Column(length = 254)
    private String content;

    @Column(nullable = true)
    private Double score;

    @Column(nullable = true)
    private Integer reviewLike;

    @Column(nullable = true)
    private KeywordType keyword;

    @OneToMany(mappedBy = "review", cascade = CascadeType.ALL)
    private List<ReviewLike>reviewLikeList=new ArrayList<>();
}
