package com.a601.backend.api.repository;

import com.a601.backend.api.domain.entity.Review;
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

    //필요없을듯
    List<Review>findAllByGuOrderByCreatedTimeDesc(String gu);
    List<Review>findAllByGuOrderByHitDesc(String gu);
    //필요없을듯

    //제목 검색
    List<Review>findByGuContainingAndDongContainingAndTitleContaining(String gu, String dong,String title);
    //내용 검색
    List<Review>findByGuContainingAndDongContainingAndContentContaining(String gu, String dong,String content);
    //아이디 검색
    List<Review>findByGuContainingAndDongContainingAndUser_EmailContaining(String gu, String dong,String id);

    @Query("select r from Review r where r.user.email = :email order by r.createdTime Desc")
    List<Review>findAllUserReview(@Param("email") String email);

}
