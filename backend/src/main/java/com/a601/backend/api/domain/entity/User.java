package com.a601.backend.api.domain.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Table(name = "user")
public class User {

    @Id
    private String userId;

    @Column(unique = true, nullable = true, length = 10)
    private String nickname;

    private Integer birthYear;

    @Column(nullable = true, length = 10)
    private String gu;

    @Column(nullable = true, length = 10)
    private String dong;

    @Column(nullable = true, length = 4)
    private String dnti;

    @Column(nullable = true, length = 30)
    private String favorite1;

    @Column(nullable = true, length = 30)
    private String favorite2;

    @Column(nullable = true, length = 30)
    private String favorite3;

    //연관관계 양방향 맵핑
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Review>reviewList=new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<ReviewLike>reviewLikeList=new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Board>boardList=new ArrayList<>();

    @OneToMany(mappedBy = "user",cascade = CascadeType.ALL)
    private List<BoardLike>boardLikeList=new ArrayList<>();

    @OneToMany(mappedBy = "user",cascade = CascadeType.ALL)
    private List<Reply>replyList=new ArrayList<>();
}
