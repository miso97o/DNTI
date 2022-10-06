package com.a601.backend.api.repository;

import com.a601.backend.api.domain.dto.response.DongScore;
import com.a601.backend.api.domain.entity.Dnti;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DntiRepository extends JpaRepository<Dnti, String> {

    List<Dnti> findAllByOrderByCountDesc();
}
