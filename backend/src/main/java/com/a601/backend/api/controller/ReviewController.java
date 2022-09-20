package com.a601.backend.api.controller;

import com.a601.backend.api.domain.dto.common.ApiResult;
import com.a601.backend.api.domain.dto.request.ReviewRequest;
import com.a601.backend.api.domain.dto.response.ReviewResponse;
import com.a601.backend.api.service.ReviewService;
import com.a601.backend.api.service.ReviewServiceImpl;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@Api(value = "리뷰 API", tags = {"리뷰"})
@RestController
@RequestMapping("/review")
public class ReviewController {

    @Autowired
    ReviewServiceImpl reviewService;

    //게시글 저장
    @ApiOperation(value = "리뷰 게시글 조회")
    @PostMapping("/save")
    public ApiResult<?>saveReview(@RequestBody ReviewRequest reviewRequest){
        //유저 로그인 했는지 여부 파악
        String email="skj@gmail.com";
        reviewService.saveReview(reviewRequest,email);
        return new ApiResult<>(200,"SaveReview");
    }

    //게시글 전체 조회
    @ApiOperation(value = "리뷰 게시글 전체 조회")
    @GetMapping("/list")
    public ApiResult<List<ReviewResponse>>reviewList(){
        List<ReviewResponse>reviewResponseList=reviewService.reviewList();
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

    @ApiOperation(value = "검색 기능")
    @GetMapping("/search/{title}")
    public ApiResult<List<ReviewResponse>>reviewSearch(@PathVariable String title){
        List<ReviewResponse>reviewResponseList=reviewService.reviewSearch(title);
        return new ApiResult<>(200,reviewResponseList);
    }

    @ApiOperation(value = " 구 최신 순(0) 조회수(1)")
    @GetMapping("/recent")
    public ApiResult<List<ReviewResponse>>reviewRecent(@RequestParam("id") Long id,@RequestParam("gu") String gu){
        List<ReviewResponse>reviewResponseList=reviewService.reviewRecent(id,gu);
        return new ApiResult<>(200,reviewResponseList);
    }


}
