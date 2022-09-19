package com.a601.backend.api.controller;

import com.a601.backend.api.domain.dto.common.ApiResult;
import com.a601.backend.api.domain.dto.request.ReviewRequest;
import com.a601.backend.api.domain.dto.response.ReviewResponse;
import com.a601.backend.api.service.ReviewService;
import com.a601.backend.api.service.ReviewServiceImpl;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api("리뷰 API")
@RestController
@RequestMapping("/review")
public class ReviewController {

    @Autowired
    ReviewServiceImpl reviewService;

    //게시글 저장
    @PostMapping("/save")
    public ApiResult<ReviewResponse>saveReview(@RequestBody ReviewRequest reviewRequest){
        //유저 로그인 했는지 여부 파악
        String email="";
        ReviewResponse reviewResponse=reviewService.saveReview(reviewRequest,email);
        return new ApiResult<>(200,reviewResponse);
    }

    //게시글 전체 조회
    @GetMapping("/list")
    public ApiResult<List<ReviewResponse>>reviewList(){
        List<ReviewResponse>reviewResponseList=reviewService.reviewList();
        return new ApiResult<>(200,reviewResponseList);
    }

    //게시글 삭제
    @DeleteMapping("/delete/{id}")
    public ApiResult<?> deleteReview(@PathVariable Long id){
        reviewService.deleteReview(id);
        return new ApiResult<>(200,"delete");
    }

    //게시글 업데이트
    @PutMapping("/udpate/{id}")
    public ApiResult<ReviewResponse>updateReview(@PathVariable Long id,@RequestBody ReviewRequest reviewRequest){
        ReviewResponse reviewResponse=reviewService.updateReview(id, reviewRequest);
        return new ApiResult<>(200,reviewResponse);
    }

    //게시글 상세 조회
    @GetMapping("/detail/{id}")
    public ApiResult<ReviewResponse>detailReview(@PathVariable Long id){
        ReviewResponse reviewResponse=reviewService.detailReview(id);
        return new ApiResult<>(200,reviewResponse);
    }


}
