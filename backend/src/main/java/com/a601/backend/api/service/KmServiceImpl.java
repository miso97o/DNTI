package com.a601.backend.api.service;

import com.a601.backend.api.domain.dto.response.KmResponse;
import com.a601.backend.api.domain.entity.Km;
import com.a601.backend.api.repository.KmRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class KmServiceImpl implements KmService {

    private final KmRepository kmRepository;


    @Override
    public List<KmResponse> calculateKm(double lat, double lon) {
        long startTime = System.nanoTime();

        List<Km> list =  kmRepository.getkmdata(lat, lon);

        long afterTime = System.nanoTime();
        System.out.println("Entity로만 계산"+(afterTime-startTime));

        long startTimeD = System.nanoTime();
        List<KmResponse> result = kmRepository.getkmdata(lat, lon).stream().map(km -> KmResponse.builder()
                .type(km.getType())
                .name(km.getName())
                .lat(km.getLat()).lon(km.getLon()).address(km.getAddress()).build()).collect(Collectors.toList());
        long afterTimeD = System.nanoTime();
        System.out.println("DTO로 변환 후 계산"+(afterTimeD-startTimeD));

//        List<Km> allPoint = kmRepository.findAll();
//        List<KmResponse> result = new ArrayList<>();
//        System.out.println(allPoint.size());
//        for (Km km:allPoint) {
//            if(distance(lat, lon, km.getLat(), km.getLon()) < 0.5){
//                KmResponse kmResponse = KmResponse.builder()
//                        .type(km.getType())
//                        .lat(km.getLat())
//                        .lon(km.getLon())
//                        .name(km.getName())
//                        .address(km.getAddress())
//                        .build();
//                result.add(kmResponse);
//            }
//        }
//        for(int i = 0 ; i < result.size(); i++){
//            System.out.println(result.get(i).getAddress());
//        }
////        System.out.println(result.size());
        return result;
    }

    /**
     * 두 지점간의 거리 계산
     *
     * lat1 지점 1 위도
     * lon1 지점 1 경도
     * lat2 지점 2 위도
     * lon2 지점 2 경도
     */
    private static double distance(double lat1, double lon1, double lat2, double lon2) {

        double theta = lon1 - lon2;
        double dist = Math.sin(deg2rad(lat1)) * Math.sin(deg2rad(lat2)) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.cos(deg2rad(theta));

        dist = Math.acos(dist);
        dist = rad2deg(dist);
        dist = dist * 60 * 1.1515;

        dist *= 1.609344;

        return (dist);
    }


    // This function converts decimal degrees to radians
    private static double deg2rad(double deg) {
        return (deg * Math.PI / 180.0);
    }

    // This function converts radians to decimal degrees
    private static double rad2deg(double rad) {
        return (rad * 180 / Math.PI);
    }

}

