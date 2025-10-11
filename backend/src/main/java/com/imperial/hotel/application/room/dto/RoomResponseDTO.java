package com.imperial.hotel.application.room.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class RoomResponseDTO {
    private Long id;
    private String roomNumber;
    private String currentStatus;
    private String roomTypeCategory;
}
