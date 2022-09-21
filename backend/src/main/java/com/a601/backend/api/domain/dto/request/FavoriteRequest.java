package com.a601.backend.api.domain.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
public class FavoriteRequest {
    Long favoriteId;
    String userId;
    String name;
    String address;
}
