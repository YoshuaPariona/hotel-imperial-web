package com.imperial.hotel.booking.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CancelReservationDTO {
    @NotBlank(message = "La razón de cancelación es obligatoria")
    @Size(max = 500, message = "La razón de cancelación no puede exceder 500 caracteres")
    private String cancelReason;
}
