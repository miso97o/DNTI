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
    @ApiOperation(value = "리뷰 게시글 상세 조회", notes = "게시글 아이디로 게시글의 데이터 반환")
    @GetMapping("/detail/{id}")
    public ApiResult<ReviewResponse>detailReview(@PathVariable Long id){
        ReviewResponse reviewResponse=reviewService.detailReview(id);
        return new ApiResult<>(200,reviewResponse);
    }

    @ApiOperation(value = "최근 한달 글 중 조회수 높은순 3개 조회 +구,동 필터", notes = "구, 동은 필터가 필요할 때만 보내기")
    @GetMapping("/hot")
    public ApiResult<List<ReviewResponse>>reviewTopList(@RequestParam(required = false) String gu, @RequestParam(required = false) String dong){
        //구, 동 필터(없으면 전체검색)
        if(gu==null) gu ="";
        if(dong==null) dong="";

        List<ReviewResponse>reviewResponseTopList=reviewService.reviewTopList(gu, dong);
        return new ApiResult<>(200,reviewResponseTopList);
    }


    @ApiOperation(value = "각 리뷰 구선택 했을 떄 평균 평점", notes = "구 평점 데이터가 없으면 null반환")
    @GetMapping("/score/{gu}")
    public ApiResult<ReviewResponse>reviewScoreGu(@PathVariable String gu){
        ReviewResponse reviewResponse=reviewService.reviewScoreGu(gu);
        return new ApiResult<>(200,reviewResponse);
    }

    @ApiOperation(value = "구, 동 필터/제목(title), 내용(content), 아이디(id) 검색 기능", notes = "구, 동 및 제목, 내용, 아이디 검색")
    @GetMapping("/search")
    public ApiResult reviewSearchTitle(@RequestParam(required = false) String gu,@RequestParam(required = false) String dong,@RequestParam String search ,@RequestParam(required = false) String word, Pageable pageable){
        //구, 동 필터(없으면 전체검색)
        if(gu==null) gu ="";
        if(dong==null) dong="";

        //키워드 없으면 전체 검색
        if(word==null) word="";

        Page<ReviewResponse>reviewResponseList=reviewService.reviewSearch(gu, dong,search,word, pageable);
        return new ApiResult<>(200,reviewResponseList);
    }


    @ApiOperation(value = " 구 최신 순(0) 조회수(1) ??")
    @GetMapping("/recent")
    public ApiResult<List<ReviewResponse>>reviewRecent(@RequestParam("id") Long id,@RequestParam("gu") String gu){
        List<ReviewResponse>reviewResponseList=reviewService.reviewRecent(id,gu);
        return new ApiResult<>(200,reviewResponseList);
    }

    @ApiOperation(value = "리뷰 좋아요 눌렀는지 여부", notes = "해당 아이디가 해당 리뷰 좋아요를 눌렀는지 여부(눌렀으면 true, 아니면 false)")
    @GetMapping("/reviewlike")
    public ApiResult isReviewLike(@RequestParam  String email, @RequestParam Long reviewId) {
        return new ApiResult(200, reviewService.isReviewLike(email, reviewId));
    }

    @ApiOperation(value = " 좋아요 추가 기능", notes = "유저 아이디와 해당 게시물 아이디로 좋아요 추가")
    @GetMapping("/reviewlike/save")
    public ApiResult<?>reviewsaveLike(@RequestParam String email,@RequestParam Long reviewId){
        //좋아요 이미 했으면 오류
        if(reviewService.isReviewLike(email,reviewId)){
            throw new CustomException(ErrorCode.METHOD_NOT_ALLOWED);
        }

        reviewService.reviewsaveLike(email, reviewId);
        return new ApiResult<>(200,"review_like");
    }

    @ApiOperation(value = " 좋아요 삭제 기능 ", notes = "유저 아이디와 해당 게시물 아이디로 찾아서 좋아요 삭제")
    @DeleteMapping("/reviewlike/delete")
    public ApiResult<?>reviewdeleteLike(@RequestParam String email,@RequestParam Long reviewId){
        //좋아요 없으면 오류
        if(!reviewService.isReviewLike(email,reviewId)){
            throw new CustomException(ErrorCode.METHOD_NOT_ALLOWED);
        }

        reviewService.reviewdeleteLike(email,reviewId);
        return new ApiResult<>(200,"review_like");
    }
}
