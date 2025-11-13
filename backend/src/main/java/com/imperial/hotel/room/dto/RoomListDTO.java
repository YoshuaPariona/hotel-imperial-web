package com.imperial.hotel.room.dto;

import jakarta.persistence.criteria.CriteriaBuilder;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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
}
