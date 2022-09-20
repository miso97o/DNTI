package com.a601.backend.api.service;

import com.a601.backend.api.domain.dto.request.ReviewRequest;
import com.a601.backend.api.domain.dto.response.ReviewResponse;
import com.a601.backend.api.domain.entity.Review;
import com.a601.backend.api.domain.entity.ReviewLike;
import com.a601.backend.api.domain.entity.User;
import com.a601.backend.api.repository.ReviewLikeRepository;
import com.a601.backend.api.repository.ReviewRepository;
import com.a601.backend.api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class ReviewServiceImpl implements ReviewService{

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private ReviewLikeRepository reviewLikeRepository;

    @Override
    public void saveReview(ReviewRequest reviewRequest, String email) {
        User user=userRepository.findByEmail(email).get();
        int total=reviewRequest.getEnvironment()+reviewRequest.getRental()+reviewRequest.getInfra()+reviewRequest.getSafety();
        Review review= Review.builder()
                .user(user)
                .title(reviewRequest.getTitle())
                .gu(user.getGu())
                .content(reviewRequest.getContent())
                .score(total/4.0)
                .hit(0)
                .reviewLike(0)
                .rental(reviewRequest.getRental())
                .environment(reviewRequest.getEnvironment())
                .infra(reviewRequest.getInfra())
                .safety(reviewRequest.getSafety())
                .build();
        reviewRepository.save(review);
    }

    @Override
    public void deleteReview(Long id) {
        reviewRepository.deleteById(id);
    }

    @Override
    public List<ReviewResponse> reviewList() {
        List<ReviewResponse>reviewList=reviewRepository.findAllByOrderByCreatedTimeDesc()
                .stream()
                .map(review -> ReviewResponse.builder()
                        .email(review.getUser().getEmail())
                        .title(review.getTitle())
                        .gu(review.getGu())
                        .content(review.getContent())
                        .score(review.getScore())
                        .hit(review.getHit())
                        .reviewLike(review.getReviewLikeList().size())
                        .rental(review.getRental())
                        .environment(review.getEnvironment())
                        .infra(review.getInfra())
                        .safety(review.getSafety())
                        .build()).collect(Collectors.toList());

        return reviewList;
    }

    @Override
    public ReviewResponse detailReview(Long id) {
        Review review=reviewRepository.findById(id).get();
        int cnt= review.getHit();
        review.setHit(cnt+1);
        ReviewResponse reviewResponse=ReviewResponse.builder()
                .email(review.getUser().getEmail())
                .title(review.getTitle())
                .gu(review.getUser().getGu())
                .content(review.getContent())
                .hit(review.getHit())
                .score(review.getScore())
                .reviewLike(review.getReviewLikeList().size())
                .rental(review.getRental())
                .environment(review.getEnvironment())
                .infra(review.getInfra())
                .safety(review.getSafety())
                .build();
        return reviewResponse;
    }

    @Override
    public void updateReview(Long id,ReviewRequest reviewRequest) {
        Review review=reviewRepository.findById(id).get();
        review.setContent(reviewRequest.getContent());
        review.setTitle(reviewRequest.getTitle());
        reviewRepository.save(review);
    }

    public List<ReviewResponse> reviewTopList(){
        List<ReviewResponse>reviewTopList=reviewRepository.findTop3ByOrderByHitDesc()
                .stream()
                .map(review -> ReviewResponse.builder()
                        .email(review.getUser().getEmail())
                        .title(review.getTitle())
                        .gu(review.getGu())
                        .content(review.getContent())
                        .score(review.getScore())
                        .hit(review.getHit())
                        .reviewLike(review.getReviewLikeList().size())
                        .rental(review.getRental())
                        .environment(review.getEnvironment())
                        .infra(review.getInfra())
                        .safety(review.getSafety())
                        .build()).collect(Collectors.toList());
        return reviewTopList;
    }

    public ReviewResponse reviewScoreGu(String gu){
        List<Review>reviewList=reviewRepository.findAllByGuOrderByCreatedTimeDesc(gu);
        int len=reviewList.size();
        int en=0; //환경
        int sa=0; //안전
        int inf=0; //인프라
        int ren=0; //임대료
        double total=0;
        for(Review review:reviewList){
            en+=review.getEnvironment();
            sa+=review.getSafety();
            inf+=review.getInfra();
            ren=review.getRental();
            total+=review.getScore();
        }

        ReviewResponse reviewResponse= ReviewResponse.builder()
                .gu(gu)
                .infra(inf/len)
                .rental(ren/len)
                .safety(sa/len)
                .environment(en/len)
                .score(total/len)
                .build();
        return reviewResponse;
    }

    public List<ReviewResponse>reviewRecent(Long id,String gu){
        if(id==0){
            List<ReviewResponse>reviewList1=reviewRepository.findAllByGuOrderByCreatedTimeDesc(gu)
                    .stream()
                    .map(review -> ReviewResponse.builder()
                            .email(review.getUser().getEmail())
                            .title(review.getTitle())
                            .gu(review.getGu())
                            .content(review.getContent())
                            .score(review.getScore())
                            .hit(review.getHit())
                            .reviewLike(review.getReviewLikeList().size())
                            .rental(review.getRental())
                            .environment(review.getEnvironment())
                            .infra(review.getInfra())
                            .safety(review.getSafety())
                            .build()).collect(Collectors.toList());
            return reviewList1;
        }else{
            List<ReviewResponse>reviewList2=reviewRepository.findAllByGuOrderByHitDesc(gu)
                    .stream()
                    .map(review -> ReviewResponse.builder()
                            .email(review.getUser().getEmail())
                            .title(review.getTitle())
                            .gu(review.getGu())
                            .content(review.getContent())
                            .score(review.getScore())
                            .hit(review.getHit())
                            .reviewLike(review.getReviewLikeList().size())
                            .rental(review.getRental())
                            .environment(review.getEnvironment())
                            .infra(review.getInfra())
                            .safety(review.getSafety())
                            .build()).collect(Collectors.toList());
            return reviewList2;
        }
    }

    public List<ReviewResponse>reviewSearch(String search,String word){
        if(search.equals("제목")){
            List<ReviewResponse>reviewList=reviewRepository.findAllByTitleContaining(word)
                    .stream()
                    .map(review -> ReviewResponse.builder()
                            .email(review.getUser().getEmail())
                            .title(review.getTitle())
                            .gu(review.getGu())
                            .content(review.getContent())
                            .score(review.getScore())
                            .hit(review.getHit())
                            .reviewLike(review.getReviewLikeList().size())
                            .rental(review.getRental())
                            .environment(review.getEnvironment())
                            .infra(review.getInfra())
                            .safety(review.getSafety())
                            .build()).collect(Collectors.toList());
            return reviewList;
        }else if(search.equals("내용")){
            List<ReviewResponse>reviewList=reviewRepository.findAllByContentContaining(word)
                    .stream()
                    .map(review -> ReviewResponse.builder()
                            .email(review.getUser().getEmail())
                            .title(review.getTitle())
                            .gu(review.getGu())
                            .content(review.getContent())
                            .score(review.getScore())
                            .hit(review.getHit())
                            .reviewLike(review.getReviewLikeList().size())
                            .rental(review.getRental())
                            .environment(review.getEnvironment())
                            .infra(review.getInfra())
                            .safety(review.getSafety())
                            .build()).collect(Collectors.toList());
            return reviewList;
        }else{
            List<ReviewResponse>reviewList=reviewRepository.findAllUserReview(word)
                    .stream()
                    .map(review -> ReviewResponse.builder()
                            .email(review.getUser().getEmail())
                            .title(review.getTitle())
                            .gu(review.getGu())
                            .content(review.getContent())
                            .score(review.getScore())
                            .hit(review.getHit())
                            .reviewLike(review.getReviewLikeList().size())
                            .rental(review.getRental())
                            .environment(review.getEnvironment())
                            .infra(review.getInfra())
                            .safety(review.getSafety())
                            .build()).collect(Collectors.toList());
            return reviewList;
        }
    }

    public void reviewsaveLike(Long id,String email){
        Review review=reviewRepository.findById(id).get();
        User user=userRepository.findByEmail(email).get();
        ReviewLike reviewLike=ReviewLike.builder()
                .user(user)
                .review(review)
                .build();
        reviewLikeRepository.save(reviewLike);
        review.setReviewLike(review.getReviewLikeList().size());
        reviewRepository.save(review);
    }

//    @Override
//    public void reviewdeleteLike(Long id,Long lid) {
//        reviewLikeRepository.deleteById(lid);
//        Review review=reviewRepository.findById(id).get();
//        review.setReviewLike(review.getReviewLikeList().size());
//        reviewRepository.save(review);
//    }

}
