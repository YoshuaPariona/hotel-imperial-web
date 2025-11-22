package com.imperial.hotel.booking.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateReservationDTO {
    @NotNull(message = "El ID del huésped es obligatorio")
    private Long guestId;

    @NotNull(message = "El ID del empleado es obligatorio")
    private Long employeeId;

    @NotNull(message = "La fecha esperada de check-in es obligatoria")
    private LocalDate checkinDateExpected;

    @NotNull(message = "La fecha esperada de check-out es obligatoria")
    private LocalDate checkoutDateExpected;

    private String status;

    // Optional room assignment
    private Long roomId;
}
