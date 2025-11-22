package com.imperial.hotel.room.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RoomListDTO {
    private Long id;
    private String number;
    private String currentStatus;
    private String roomTypeCategory;
    private String roomTypeBedSize;
    private Integer roomTypeBedQuantity;
    private String amenities;
    private BigDecimal nightlyRate;
}
