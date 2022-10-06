package com.a601.backend.api.domain.entity;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@Getter
@Setter
public class Km {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long baseId;

    String type;

    String name;

    double lat;

    double lon;

    String address;
}
