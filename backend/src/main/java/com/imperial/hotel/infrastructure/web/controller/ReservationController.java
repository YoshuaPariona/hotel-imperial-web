package com.imperial.hotel.infrastructure.web.controller;

import com.imperial.hotel.application.reservation.dto.ReservationResponseDTO;
import com.imperial.hotel.application.reservation.usecase.ListReservationsUseCase;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reservas")
public class ReservationController {

    private final ListReservationsUseCase listReservationsUseCase;

    public ReservationController(ListReservationsUseCase listReservationsUseCase) {
        this.listReservationsUseCase = listReservationsUseCase;
    }

    // Endpoint GET /api/reservas -> lista todas las reservas
    @GetMapping
    public List<ReservationResponseDTO> listReservations() {
        return listReservationsUseCase.execute();
    }
}
