package com.a601.backend.api.service;

import com.a601.backend.api.domain.dto.request.UserRequest;
import com.a601.backend.api.domain.entity.User;
import com.a601.backend.api.domain.enums.ErrorCode;
import com.a601.backend.api.exception.CustomException;
import com.a601.backend.api.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.meta.TypeQualifierNickname;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService{
    private final UserRepository repository;

    //회원가입
    @Override
    @Transactional
    public void singIn(UserRequest.SingIn singIn, HttpServletResponse response) {
        //이미 가입된 유저인지 확인(아이디로)
        if(repository.existsById(singIn.getUserId())){
            //예외 던지기
            throw new CustomException(ErrorCode.METHOD_NOT_ALLOWED);
        }

        User user = User.builder().email(singIn.getUserId()).birthYear(singIn.getBirthYear()).nickname(singIn.getNickname())
                .gu(singIn.getGu()).dong(singIn.getDong()).build();

        ResponseCookie cookie = ResponseCookie.from("userEmail",singIn.getUserId()).path("/").domain("localhost").sameSite("None").secure(true).build();
        response.setHeader("Set-Cookie", cookie.toString());

        repository.save(user);
    }

    @Override
    @Transactional
    public void modifyInfo(UserRequest.ModifyAll modifyAll) {
        User oUser = repository.findById(modifyAll.getUserId()).orElseThrow(() -> new CustomException(ErrorCode.POSTS_NOT_FOUND));
        oUser.modify(modifyAll);
    }


    //    @Override
//    @Transactional
//    public void modifyDnti(UserRequest.ModifyDNTI modifyDNTI) {
//        User oUser = repository.findById(modifyDNTI.getUserId()).orElseThrow(() -> new CustomException(ErrorCode.POSTS_NOT_FOUND));
//        oUser.modify();
//    }
//
//    @Override
//    @Transactional
//    public void modifyAddress(UserRequest.ModifyAddress modifyAddress) {
//
//    }



    @Override
    @Transactional
    public void singOut(String userId) {
        repository.deleteById(userId);
    }

    @Override
    public boolean hasNickname(String nickname) {
        return repository.existsByNickname(nickname);
    }

    //회원목록
    @Override
    public List<UserRequest.All> getList() {
        List<User> list =  repository.findAll();
        List<UserRequest.All> result = new ArrayList<>();
        for(User one : list){
            UserRequest.All temp = UserRequest.All.builder().userId(one.getEmail())
                    .nickname(one.getNickname()).birthYear(one.getBirthYear()).gu(one.getGu()).dong(one.getDong())
                    .dnti(one.getDnti()).build();
            result.add(temp);
        }
        return result;
    }

    @Override
    public UserRequest.All getInfo(String email) {
        User oUser = repository.findById(email).orElseThrow(() -> new CustomException(ErrorCode.POSTS_NOT_FOUND));

        UserRequest.All result = UserRequest.All.builder()
                .userId(oUser.getEmail()).birthYear(oUser.getBirthYear()).dong(oUser.getDong()).gu(oUser.getGu()).dnti(oUser.getDnti()).nickname(oUser.getNickname()).build();
        return result;
    }

    @Override
    @Transactional
    public void saveDnti(String type,String email) throws Exception {
        User user=repository.findByEmail(email).get();
        user.setDnti(type);
        repository.save(user);
    }

}
