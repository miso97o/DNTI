package com.a601.backend.api.domain.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import javax.persistence.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Table(name = "favorite")
public class Favorite {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long favoriteId;

    @JoinColumn(name = "user_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private User user;

    @Column(length = 10)
    private String name;

    @Column(length = 200)
    private String address;

    @Builder
    public Favorite(Long favoriteId, User user, String name, String address) {
        this.favoriteId = favoriteId;
        this.user = user;
        this.name = name;
        this.address = address;
    }

    public void modify(String name, String address) {
        this.name = name;
        this.address = address;
    }
}
