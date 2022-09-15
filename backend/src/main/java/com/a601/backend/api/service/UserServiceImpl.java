package com.a601.backend.api.service;

import com.a601.backend.api.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{
    private final UserRepository repository;

    @Override
    public boolean hasNickname(String nickname) {
        return repository.existsByNickname(nickname);
    }
}
