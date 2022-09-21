package com.a601.backend.api.domain.entity;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Setter
@Table(name = "dnti")
public class Dnti {
    @Id
    String type;

    Long count;

    @Column(length = 5)
    String hashtag1;

    @Column(length = 5)
    String hashtag2;
}
