package com.a601.backend.api.repository;

import com.a601.backend.api.domain.entity.Dong;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DongRepository extends JpaRepository<Dong, Integer> {
}
