package com.imperial.hotel.booking.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.OffsetDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReservationListDTO {
    private Long reservationId;
    private String roomNumber;
    private String guestName;
    private OffsetDateTime checkIn;
    private OffsetDateTime checkOut;
    private String status;
}
