package com.imperial.hotel.booking.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReservationDetailDTO {
    private Long id;
    private String code;
    private GuestDTO guest;
    private EmployeeDTO employee;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private LocalDate checkinDateExpected;
    private LocalDate checkoutDateExpected;
    private String status;
    private String cancelReason;
    // Room information from occupancy
    private String roomNumber;
    private Long roomId;
}
