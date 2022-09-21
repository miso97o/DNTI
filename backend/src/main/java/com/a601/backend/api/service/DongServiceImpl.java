package com.a601.backend.api.service;

import com.a601.backend.api.domain.dto.response.DongScore;
import com.a601.backend.api.domain.entity.Dong;
import com.a601.backend.api.repository.DongRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class DongServiceImpl implements DongService{

    @Autowired
    private DongRepository dongRepository;

    @Override
    public List<DongScore> computeDongScore(List<Integer> priorities) { //우선순위에 따른 점수 계산, 리스트 반환
        //priorities는 순위가 들어있음
        List<Dong> dongList = dongRepository.findAll();         //전체 리스트 가져오기
        List<DongScore> rankList = new ArrayList<>();           //동,점수 객체를 담을 리스트
        for(Dong dong : dongList) {
//            boolean[] computed = new boolean[7];                //우선순위에 안담긴 지표를 확인하기 위한 배열
            double weight = 2.0;                                //가중치
            DongScore tmp = new DongScore();
            double sum = 0;                                     //점수 합
            for(int p : priorities) {                           //우선순위 순으로 조회
                sum += getScore(p,dong)*weight;                 //해당하는 점수에 가중치 곱함
                weight -= 0.2;                                  //가중치 낮추기
//                computed[p] = true;                             //계산한 것 표시
            }
//            for(int i=1; i<7; ++i){                             //우선순위 없는 점수 더함
//                if(!computed[i]) sum += getScore(i,dong);
//            }
            tmp.setDongName(dong.getDong());                    //리스트에 추가
            tmp.setTotalScore(sum);
            rankList.add(tmp);
        }
        rankList.sort(Collections.reverseOrder());              //점수 내림차순으로 정렬 후 반환
        List<DongScore> result = rankList.subList(0,5);
        return result;
    }

    public double getScore(int idx, Dong dong) {    //idx에 따라서 해당하는 점수를 가져오는 메서드
        if(idx == 1) return dong.getPrice();
        else if(idx == 2) return dong.getTraffic_score();
        else if(idx == 3) return dong.getEating_score();
        else if(idx == 4) return dong.getCulture_score();
        else if(idx == 5) return dong.getSafety_score();
        else return dong.getEnv_score();
    }
}
