package com.a601.backend.api.repository;

import com.a601.backend.api.domain.entity.Km;
import org.springframework.data.jpa.repository.JpaRepository;

public interface KmRepository extends JpaRepository<Km, Long> {

}
