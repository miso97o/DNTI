package com.a601.backend.api.domain.entity;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Getter
@Setter
public class Km {
    @Id
    Long baseId;

    String type;

    String name;

    double lat;

    double lon;

    String address;
}
