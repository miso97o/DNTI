package com.a601.backend.api.service.oauth;

import com.a601.backend.api.domain.dto.GoogleLoginDto;

public interface GoogleService {

    GoogleLoginDto googleRedirect(String authCode) throws Exception;
}
