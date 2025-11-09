package com.imperial.hotel.occupancy.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.OffsetDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OccupancyListDTO {
    private Long occupancyId;
    private String roomNumber;
    private String guestName;
    private OffsetDateTime checkInDate;
    private OffsetDateTime checkOutDate;
    private String status;
}
