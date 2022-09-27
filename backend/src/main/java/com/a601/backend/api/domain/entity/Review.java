package com.a601.backend.api.domain.entity;

import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class Review extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reviewId;

    @JoinColumn(name = "user_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private User user;

    @Column(length = 10)
    private String gu;

    @Column(length = 30)
    private String title;

    @Column(length = 254)
    private String content;

    @Column(nullable = true)
    private Double score;

    @Column(nullable = true)
    private Integer reviewLike;

    @Column(nullable = true)
    private Integer hit;

    @Column(nullable = true)
    private Integer rental;

    @Column(nullable = true)
    private Integer infra;

    @Column(nullable = true)
    private Integer environment;

    @Column(nullable = true)
    private Integer safety;

    


    @OneToMany(mappedBy = "review", cascade = CascadeType.ALL)
    private List<ReviewLike>reviewLikeList=new ArrayList<>();

}
