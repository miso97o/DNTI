package com.a601.backend.api.service;

import com.a601.backend.api.domain.entity.Board;
import com.a601.backend.api.domain.entity.User;

import java.util.List;

public interface BoardService {

    List<Board> findByTitle(String title);

    List<User> findByUser(String user);
}
