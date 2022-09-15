package com.a601.backend.api.domain.dto.response;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class DongScore implements Comparable<DongScore> {
    private String dongName;
    private double totalScore;

    @Override
    public int compareTo(DongScore o) {
        double result = this.totalScore-o.totalScore;
        if(result < 0) return -1;
        else if(result == 0) return 0;
        else return 1;
    }
}
