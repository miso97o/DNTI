package com.a601.backend.api.service;

import com.a601.backend.api.domain.entity.User;
import com.a601.backend.api.domain.request.UserRequest;
import com.a601.backend.api.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{
    private final UserRepository repository;

    @Override
    public String singIn(UserRequest.SingIn singIn) {


//        repository.save(singIn)
        return null;
    }

    @Override
    public boolean hasNickname(String nickname) {
        return repository.existsByNickname(nickname);
    }
}
