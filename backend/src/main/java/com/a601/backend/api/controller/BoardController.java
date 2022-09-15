package com.a601.backend.api.controller;


import com.a601.backend.api.domain.entity.Board;

import com.a601.backend.api.service.BoardService;
import com.a601.backend.api.service.ResponseService;
import lombok.AllArgsConstructor;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/board")
@AllArgsConstructor
public class BoardController {
    private final BoardService boardService;
    private final ResponseService responseService;



}
