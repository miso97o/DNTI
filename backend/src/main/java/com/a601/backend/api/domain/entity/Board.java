package com.a601.backend.api.domain.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
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
}
