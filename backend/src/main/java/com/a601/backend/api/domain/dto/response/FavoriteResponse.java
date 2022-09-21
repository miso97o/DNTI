package com.a601.backend.api.domain.dto.response;

import lombok.*;

@Data
@NoArgsConstructor
public class FavoriteResponse {
    Long favoriteId;
    String name;
    String address;
}
