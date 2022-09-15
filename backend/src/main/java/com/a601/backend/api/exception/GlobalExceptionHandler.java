package com.a601.backend.api.exception;

import com.a601.backend.api.domain.enums.ErrorCode;
import com.a601.backend.api.domain.response.ApiResult;
import com.a601.backend.api.domain.response.ErrorResponse;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import lombok.extern.slf4j.Slf4j;

@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    /*
     * Developer Custom Exception
     */
    @ExceptionHandler(CustomException.class)
    protected ApiResult handleCustomException(final CustomException e) {
        log.error("handleCustomException: {}", e.getErrorCode());
        return new ApiResult(e.getErrorCode().getStatus().value(), new ErrorResponse(e.getErrorCode()));
    }

    /*
     * HTTP 405 Exception
     */
    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    protected ApiResult handleHttpRequestMethodNotSupportedException(final HttpRequestMethodNotSupportedException e) {
        log.error("handleHttpRequestMethodNotSupportedException: {}", e.getMessage());
        return new ApiResult(ErrorCode.METHOD_NOT_ALLOWED.getStatus().value(), new ErrorResponse(ErrorCode.METHOD_NOT_ALLOWED));
    }

    /*
     * HTTP 500 Exception
     */
    @ExceptionHandler(Exception.class)
    protected ApiResult handleException(final Exception e) {
        log.error("handleException: {}", e.getMessage());
        return new ApiResult(ErrorCode.INTERNAL_SERVER_ERROR.getStatus().value(), new ErrorResponse(ErrorCode.INTERNAL_SERVER_ERROR));
    }

}
