package com.a601.backend.api.domain.entity;

import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class Gu {
    @Id
    String guName;

    @OneToMany(mappedBy = "gu", cascade = CascadeType.ALL)
    private List<Dong> dongList = new ArrayList<>();
}
