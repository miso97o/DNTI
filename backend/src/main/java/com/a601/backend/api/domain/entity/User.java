package com.a601.backend.api.domain.entity;

import com.a601.backend.api.domain.dto.request.UserRequest;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
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

    //연관관계 양방향 맵핑
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Favorite> favoriteList = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Review> reviewList = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<ReviewLike> reviewLikeList = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Board> boardList = new ArrayList<>();

    @OneToMany(mappedBy = "user",cascade = CascadeType.ALL)
    private List<BoardLike> boardLikeList = new ArrayList<>();

    @OneToMany(mappedBy = "user",cascade = CascadeType.ALL)
    private List<Reply> replyList = new ArrayList<>();

    @Builder
    public User(String userId, String nickname, Integer birthYear, String gu, String dong, String dnti, List<Favorite> favoriteList, List<Review> reviewList, List<ReviewLike> reviewLikeList, List<Board> boardList, List<BoardLike> boardLikeList, List<Reply> replyList) {
        this.userId = userId;
        this.nickname = nickname;
        this.birthYear = birthYear;
        this.gu = gu;
        this.dong = dong;
        this.dnti = dnti;
        this.favoriteList = favoriteList;
        this.reviewList = reviewList;
        this.reviewLikeList = reviewLikeList;
        this.boardList = boardList;
        this.boardLikeList = boardLikeList;
        this.replyList = replyList;
    }


//    public void modify(String nickname, Integer birthYear, String gu, String dong){
//        this.nickname = nickname;
//        this.birthYear = birthYear;
//        this.gu = gu;
//        this.dong = dong;
//    }
    public void modify(UserRequest.ModifyAll modifyAll){
        if(modifyAll.getNickname()!=null){
            this.nickname = modifyAll.getNickname();
        }
        if(modifyAll.getBirthYear()!=null){
            this.birthYear = modifyAll.getBirthYear();
        }
        if(modifyAll.getGu()!=null){
            this.gu = modifyAll.getGu();
        }
        if(modifyAll.getDong()!=null){
            this.dong = modifyAll.getDong();
        }
    }
}
