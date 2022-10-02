package com.a601.backend.api.repository;

import com.a601.backend.api.domain.entity.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review,Long> {

    List<Review> findAllByOrderByCreatedTimeDesc(Pageable pageable);

    //인기글 3개(구, 동 기준)
    List<Review>findTop3ByGuContainingAndDongContainingOrderByHitDesc(String gu, String dong);

    //내가 쓴글 3개
    List<Review> findTop3ByUser_EmailOrderByCreatedTimeDesc(String email);


    //제목 검색
    Page<Review> findByGuContainingAndDongContainingAndTitleContaining(String gu, String dong, String title, Pageable pageable);
    //내용 검색
    Page<Review>findByGuContainingAndDongContainingAndContentContaining(String gu, String dong,String content, Pageable pageable);
    //아이디 검색
    Page<Review>findByGuContainingAndDongContainingAndUser_EmailContaining(String gu, String dong,String id, Pageable pageable);


    //필요없을듯
    List<Review>findAllByGuOrderByCreatedTimeDesc(String gu);
    List<Review>findAllByGuOrderByHitDesc(String gu);
    //필요없을듯
}
