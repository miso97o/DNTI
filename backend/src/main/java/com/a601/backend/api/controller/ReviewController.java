package com.a601.backend.api.controller;

import com.a601.backend.api.domain.dto.common.ApiResult;
import com.a601.backend.api.domain.dto.request.ReviewRequest;
import com.a601.backend.api.domain.dto.response.ReviewResponse;
import com.a601.backend.api.domain.enums.ErrorCode;
import com.a601.backend.api.exception.CustomException;
import com.a601.backend.api.service.ReviewService;
import com.a601.backend.api.service.ReviewServiceImpl;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@Api(value = "리뷰 API", tags = {"리뷰"})
@RestController
@CrossOrigin("*")
@RequestMapping("/review")
public class ReviewController {

    @Autowired
    ReviewServiceImpl reviewService;

    //게시글 저장
    @ApiOperation(value = "리뷰 게시글 저장")
    @PostMapping("/save")
    public ApiResult saveReview(@RequestBody ReviewRequest reviewRequest){
        reviewService.saveReview(reviewRequest);
        return new ApiResult<>(200,"SaveReview");
    }

    //게시글 전체 조회
    @ApiOperation(value = "리뷰 게시글 전체 조회")
    @GetMapping("/list")
    public ApiResult reviewList(Pageable pageable){
        List<ReviewResponse>reviewResponseList=reviewService.reviewList(pageable);
        return new ApiResult<>(200,reviewResponseList);
    }

    //게시글 삭제
    @ApiOperation(value = "리뷰 게시글 삭제")
    @DeleteMapping("/delete/{id}")
    public ApiResult<?> deleteReview(@PathVariable Long id){
        reviewService.deleteReview(id);
        return new ApiResult<>(200,"delete");
    }

    //게시글 업데이트
    @ApiOperation(value = "리뷰 게시글 업데이트")
    @PutMapping("/udpate/{id}")
    public ApiResult<?>updateReview(@PathVariable Long id,@RequestBody ReviewRequest reviewRequest){
        reviewService.updateReview(id, reviewRequest);
        return new ApiResult<>(200,"update review");
    }

    //게시글 상세 조회
    @ApiOperation(value = "리뷰 게시글 상세 조회")
    @GetMapping("/detail/{id}")
    public ApiResult<ReviewResponse>detailReview(@PathVariable Long id){
        ReviewResponse reviewResponse=reviewService.detailReview(id);
        return new ApiResult<>(200,reviewResponse);
    }

    @ApiOperation(value = "리뷰 게시글 최근 한달 글 중 하트 높은순 3개 조회")
    @GetMapping("/toplist")
    public ApiResult<List<ReviewResponse>>reviewTopList(){
        List<ReviewResponse>reviewResponseTopList=reviewService.reviewTopList();
        return new ApiResult<>(200,reviewResponseTopList);
    }


    @ApiOperation(value = "각 리뷰 구선택 했을 떄 평균 평점")
    @GetMapping("/score/{gu}")
    public ApiResult<ReviewResponse>reviewScoreGu(@PathVariable String gu){
        ReviewResponse reviewResponse=reviewService.reviewScoreGu(gu);
        return new ApiResult<>(200,reviewResponse);
    }

    @ApiOperation(value = "제목(title), 내용(content), 동(dong),아이디(id) 검색 기능")
    @GetMapping("/search")
    public ApiResult<List<ReviewResponse>>reviewSearchTitle(@RequestParam("search") String search ,@RequestParam("word") String word){
        List<ReviewResponse>reviewResponseList=reviewService.reviewSearch(search,word);
        return new ApiResult<>(200,reviewResponseList);
    }


    @ApiOperation(value = " 구 최신 순(0) 조회수(1)")
    @GetMapping("/recent")
    public ApiResult<List<ReviewResponse>>reviewRecent(@RequestParam("id") Long id,@RequestParam("gu") String gu){
        List<ReviewResponse>reviewResponseList=reviewService.reviewRecent(id,gu);
        return new ApiResult<>(200,reviewResponseList);
    }

    @ApiOperation(value = " 좋아요 추가 기능 ")
    @GetMapping("/reviewlike/save")
    public ApiResult<?>reviewsaveLike(@RequestParam("id") Long id){
        String email="hjw@gmail.com";
        reviewService.reviewsaveLike(id,email);
        return new ApiResult<>(200,"review_like");
    }

    @ApiOperation(value = " 좋아요 삭제 기능 ")
    @DeleteMapping("/reviewlike/delete")
    public ApiResult<?>reviewdeleteLike(@RequestParam("id") Long id,@RequestParam("lid") Long lid){
        reviewService.reviewdeleteLike(id,lid);
        return new ApiResult<>(200,"review_like");
    }
}
