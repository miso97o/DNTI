package com.a601.backend.api.domain.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@DynamicInsert
public class Board extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long boardId;

    @JoinColumn(name = "user_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private User user;

    @Column(length = 100)
    private String title;

    @Column(length = 254)
    private String contents;

    @ColumnDefault("0")
    private Long hit;

    @ColumnDefault("0")
    private Long boardLike;

    @OneToMany(mappedBy = "board",cascade = CascadeType.ALL)
    private List<Reply>replyList=new ArrayList<>();

    @OneToMany(mappedBy = "board",cascade = CascadeType.ALL)
    private List<BoardLike>boardLikeList=new ArrayList<>();

    @Column(length = 10)
    private String dong;


    public void modify(String title, String contents){
        this.title = title;
        this.contents = contents;
    }

    public void increaseHit() {
        ++this.hit;
    }
    public void addBoardLike(){
        ++this.boardLike;
    }
    public void cancelBoardLike(){
        --this.boardLike;
    }
}
