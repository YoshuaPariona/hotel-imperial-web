package com.imperial.hotel.application.reservation.dto;

import lombok.*;
import java.time.ZonedDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReservationRequestDTO {
    private Long roomId;
    private Long userId;
    private Long guestId;
    private ZonedDateTime checkIn;
    private ZonedDateTime checkOut;
    private String status;
}
