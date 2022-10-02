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
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Optional;

@Controller
@CrossOrigin("*")
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
    public String redirectGoogleLogin(
            @RequestParam(value = "code") String authCode, HttpServletResponse response
    ){
        System.out.println(authCode);
        // HTTP 통신을 위해 RestTemplate 활용
        GoogleLoginDto googleLoginDto=googleService.googleRedirect(authCode);
        String email=googleLoginDto.getEmail();
        Optional<User>user=userRepository.findByEmail(email);

        if(!user.isPresent()){

            ResponseCookie cookie = ResponseCookie.from("userEmail",email).path("/").domain("localhost").sameSite("None").secure(true).build();
            response.setHeader("Set-Cookie", cookie.toString());

            return "redirect:https://j7a601.p.ssafy.io/signup";

        }
        GoogleResponse googleResponse2=GoogleResponse.builder()
                .email(googleLoginDto.getEmail())
                .flag(true)
                .domain("http://localhost:9090/api")
                .build();

        ResponseCookie cookie = ResponseCookie.from("userEmail",email).path("/").domain("j7a601.p.ssafy.io").sameSite("None").secure(true).build();
        response.setHeader("Set-Cookie", cookie.toString());

        //여기서 세션에 값 넣으면 될듯?
        return "redirect:https://j7a601.p.ssafy.io/";
    }

    @PostMapping("/logout")
    public String logout(HttpSession session) {
        session.invalidate();
        return "redirect:/";
    }

}
