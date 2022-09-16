package com.a601.backend.api.domain.entity;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Builder
@Getter
public class Dnti {
    @Id
    String type;

    Long count;
}
