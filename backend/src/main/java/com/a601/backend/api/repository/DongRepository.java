package com.a601.backend.api.repository;

import com.a601.backend.api.domain.entity.Dong;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DongRepository extends JpaRepository<Dong, Integer> {
    List<Dong> findAllByGu_GuName(String gu);
}
