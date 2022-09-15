package com.a601.backend.api.repository;

import com.a601.backend.api.domain.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    //중복 닉네임 검사
    boolean existsByNickname(String nickname);

}
