package com.a601.backend.api.repository;

import com.a601.backend.api.domain.entity.Km;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface KmRepository extends JpaRepository<Km, Long> {
    @Query(value = "SELECT *,(6371*acos(cos(radians(:lat))*cos(radians(lat))*cos(radians(lon)-radians(:lon))+sin(radians(:lat))*sin(radians(lat)))) AS distance FROM km HAVING distance <= 0.5",nativeQuery = true)
    List<Km> getkmdata(double lat, double lon);
}
