package com.a601.backend.api.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
public class Reply extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JoinColumn(name = "user_id")
    @ManyToOne
    private User user;

    @JoinColumn(name = "board_id")
    @ManyToOne
    private Board board;

    @Column(nullable = true, length = 100)
    private String contents;

    //대댓글 기능 구현하려면 필요 , 필요 없으면 삭제 가능
    private Long pid;
}
