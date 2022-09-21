package com.a601.backend.api.controller;

import com.a601.backend.api.domain.dto.GoogleLoginDto;
import com.a601.backend.api.domain.dto.request.GoogleLoginRequest;
import com.a601.backend.api.domain.dto.response.GoogleLoginResponse;
import com.a601.backend.api.domain.dto.response.GoogleResponse;
import com.a601.backend.api.domain.entity.User;
import com.a601.backend.api.repository.UserRepository;
import com.a601.backend.api.service.oauth.GoogleServiceImpl;
import com.a601.backend.utils.ConfigUtils;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Optional;

@Controller
@RequestMapping(value = "/google")
public class GoogleController {

    private final ConfigUtils configUtils;

    GoogleController(ConfigUtils configUtils) {
        this.configUtils = configUtils;
    }

    @Autowired
    GoogleServiceImpl googleService;

    @Autowired
    UserRepository userRepository;

    @GetMapping(value = "/login")
    public ResponseEntity<Object> moveGoogleInitUrl() {
        String authUrl = configUtils.googleInitUrl();
        URI redirectUri = null;
        try {
            redirectUri = new URI(authUrl);
            HttpHeaders httpHeaders = new HttpHeaders();
            httpHeaders.setLocation(redirectUri);
            System.out.println("111111111111111111111111");
            return new ResponseEntity<>(httpHeaders, HttpStatus.SEE_OTHER);
        } catch (URISyntaxException e) {
            e.printStackTrace();
        }

        return ResponseEntity.badRequest().build();
    }

    @GetMapping(value = "/login/redirect")
    public ResponseEntity<GoogleResponse> redirectGoogleLogin(
            @RequestParam(value = "code") String authCode
    ){
        System.out.println(authCode);
        // HTTP 통신을 위해 RestTemplate 활용
        GoogleLoginDto googleLoginDto=googleService.googleRedirect(authCode);
        String email=googleLoginDto.getEmail();
        Optional<User>user=userRepository.findByEmail(email);

        if(!user.isPresent()){
            GoogleResponse googleResponse1=GoogleResponse.builder()
                    .email(googleLoginDto.getEmail())
                    .flag(false)
                    .domain("http://localhost:9090/google/signup")
                    .build();
            return ResponseEntity.ok().body(googleResponse1);
        }
        GoogleResponse googleResponse2=GoogleResponse.builder()
                .email(googleLoginDto.getEmail())
                .flag(true)
                .domain("http://localhost:9090")
                .build();
        return ResponseEntity.badRequest().build();

    }


}
