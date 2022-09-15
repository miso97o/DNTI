package com.a601.backend.api.repository;

import com.a601.backend.api.domain.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, String> {


    boolean existsByNickname(String nickname);

}
