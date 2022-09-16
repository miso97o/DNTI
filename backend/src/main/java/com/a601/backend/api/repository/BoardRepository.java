package com.a601.backend.api.repository;

import com.a601.backend.api.domain.entity.Board;
import com.a601.backend.api.domain.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface BoardRepository  extends JpaRepository<Board, Long> {

    Page<Board> findAll(Pageable pageable);





}
