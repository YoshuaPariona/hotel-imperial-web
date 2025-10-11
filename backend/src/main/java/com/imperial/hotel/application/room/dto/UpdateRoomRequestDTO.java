package com.imperial.hotel.application.room.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateRoomRequestDTO {
    private String roomNumber;
    private String currentStatus;
    private String roomTypeCategory;
    private String note; // opcional
}
