package com.a601.backend.api.domain.dto.request;

import com.a601.backend.api.domain.entity.ReviewLike;
import com.a601.backend.api.domain.entity.User;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ReviewRequest {
    private String email;
    private String title;
    private String content;
    private Integer rental;
    private Integer infra;
    private Integer environment;
    private Integer safety;
}
