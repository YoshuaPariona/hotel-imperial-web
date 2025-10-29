package com.imperial.hotel.room.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RoomListDTO {
    private String number;
    private String currentStatus;
    private String roomTypeCategory;
}
