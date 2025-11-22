package com.imperial.hotel.booking.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateReservationDTO {
    private Long guestId;
    private LocalDate checkinDateExpected;
    private LocalDate checkoutDateExpected;
    private String status;
    private Long roomId;
}
