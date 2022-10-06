package com.a601.backend.api.controller;

import com.a601.backend.api.domain.dto.common.ApiResult;
import com.a601.backend.api.domain.dto.request.FavoriteRequest;
import com.a601.backend.api.domain.enums.ErrorCode;
import com.a601.backend.api.exception.CustomException;
import com.a601.backend.api.repository.FavoriteRepository;
import com.a601.backend.api.service.FavoriteServiceImpl;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@Api(value = "즐겨찾기 API", tags = {"즐겨찾기"})
@RestController
@CrossOrigin("*")
@RequestMapping("/favorite")
@AllArgsConstructor
public class FavoriteController {

    private final FavoriteServiceImpl service;
    private final FavoriteRepository repository;

    @ApiOperation(value = "즐겨찾기 조회", notes="조회")
    @GetMapping("/{userId}")
    public ApiResult getFavorite(@PathVariable String userId) {
        if(userId==null || userId.equals("")) throw new CustomException(ErrorCode.METHOD_NOT_ALLOWED);
        return new ApiResult(200, service.getFavorite(userId));
    }

    @ApiOperation(value = "즐겨찾기 추가", notes="추가")
    @PostMapping
    public ApiResult addFavorite(@RequestBody FavoriteRequest favorite)  {
        //해당 유저의 즐겨찾기 개수가 3개 이하가 아니면 메서드 허용 에러
        if(!service.isUnder3(favorite.getUserId())) throw new CustomException(ErrorCode.METHOD_NOT_ALLOWED);

        service.addFavorite(favorite);
        return new ApiResult(200, favorite);
    }

    //favorite 수정
    @ApiOperation(value = "즐겨찾기 수정", notes="수정")
    @PatchMapping
    public ApiResult modifyFavorite(@RequestBody FavoriteRequest favorite) {
        service.modifyFavorite(favorite);
        return new ApiResult(200, favorite);
    }

    //favorite 삭제
    @ApiOperation(value = "즐겨찾기 삭제", notes="삭제")
    @DeleteMapping("/{favoriteId}")
    public ApiResult deleteFavorite(@PathVariable Long favoriteId) {
        service.deleteFavorite(favoriteId);
        return new ApiResult(200, favoriteId);
    }
}
