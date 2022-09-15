package com.a601.backend.api.service;

import com.a601.backend.api.domain.entity.Board;
import com.a601.backend.api.domain.entity.User;
import com.a601.backend.api.repository.BoardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService {
    private final BoardRepository boardRepository;


    @Override
    public Board findByBoardId(Long boardId) {
        return boardRepository.findByBoardId(boardId);
    }

}
