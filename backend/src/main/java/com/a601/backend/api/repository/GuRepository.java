package com.a601.backend.api.repository;

import com.a601.backend.api.domain.dto.response.AddressResponse;
import com.a601.backend.api.domain.entity.Gu;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GuRepository extends JpaRepository<Gu, String> {

}
