package com.a601.backend.api.service;

import com.a601.backend.api.domain.dto.request.BoardRequest;
import com.a601.backend.api.domain.dto.response.BoardResponse;
import com.a601.backend.api.domain.entity.Board;
import com.a601.backend.api.domain.entity.User;
import com.a601.backend.api.domain.enums.ErrorCode;
import com.a601.backend.api.exception.CustomException;
import com.a601.backend.api.repository.BoardRepository;
import com.a601.backend.api.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;


@Service
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService {
    private final BoardRepository boardRepository;
    private final UserRepository userRepository;


    @Override
    public BoardResponse findByBoardId(Long boardId) {
        Board board = boardRepository.findById(boardId).orElseThrow(() -> new CustomException(ErrorCode.POSTS_NOT_FOUND));
        BoardResponse boardResponse = new BoardResponse(board);

        return boardResponse;
    }

    @Override
    public Long writeBoard(BoardRequest request) {
        User user = userRepository.getReferenceById(request.getUserId());
        Board board = Board.builder()
                .user(user)
                .title(request.getTitle())
                .contents(request.getContents()).build();
        boardRepository.save(board);
        return board.getBoardId();
    }

    @Override
    public void deleteBoard(Long boardId) {
        boardRepository.deleteById(boardId);
    }

    @Override
    @Transactional
    public void modifyBoard(BoardRequest request, Long boardId) {
        Board board = boardRepository.findById(boardId).orElseThrow(() -> new CustomException(ErrorCode.POSTS_NOT_FOUND));
        board.modify(request.getTitle(), request.getContents());
    }

    @Override
    public void updateHit(Long boardId) {
        Board board = boardRepository.findById(boardId).orElseThrow(()-> new CustomException(ErrorCode.POSTS_NOT_FOUND));
        board.increaseHit();

    }


}
