package com.a601.backend.api.repository;

import com.a601.backend.api.domain.entity.Dnti;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DntiRepository extends JpaRepository<Dnti, String> {
}
