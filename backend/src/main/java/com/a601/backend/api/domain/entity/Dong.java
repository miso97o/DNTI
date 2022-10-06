package com.a601.backend.api.domain.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class Dong {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer dongId;

    @Column(nullable = false)
    private String dong;

    private Double price;

    private Double traffic_score;

    private Double eating_score;

    private Double culture_score;

    private Double safety_score;

    private Double env_score;

    @JoinColumn(name = "gu_name")
    @ManyToOne(fetch = FetchType.LAZY)
    private Gu gu;
}
