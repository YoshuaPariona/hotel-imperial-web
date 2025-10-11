package com.imperial.hotel.application.reservation.dto;

import lombok.Builder;
import lombok.Data;
import java.time.OffsetDateTime;

@Data
@Builder
public class ReservationResponseDTO {
    private Long reservationId;
    private String roomNumber;  // <-- ahora el número de habitación
    private String guestName;   // <-- sin guestId
    private OffsetDateTime checkIn;
    private OffsetDateTime checkOut;
    private String status;
}
