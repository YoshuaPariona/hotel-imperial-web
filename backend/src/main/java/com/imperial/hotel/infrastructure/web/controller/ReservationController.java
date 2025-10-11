package com.imperial.hotel.infrastructure.web.controller;

import com.imperial.hotel.application.reservation.dto.ReservationResponseDTO;
import com.imperial.hotel.application.reservation.usecase.ListReservationsByGuestUseCase;
import com.imperial.hotel.application.reservation.usecase.ListReservationsUseCase;
import com.imperial.hotel.domain.reservation.repository.ReservationRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reservas")
public class ReservationController {

    private final ListReservationsUseCase listReservationsUseCase;
    private final ListReservationsByGuestUseCase listReservationsByGuestUseCase;

    public ReservationController(ListReservationsUseCase listReservationsUseCase,
                                 ListReservationsByGuestUseCase listReservationsByGuestUseCase) {
        this.listReservationsUseCase = listReservationsUseCase;
        this.listReservationsByGuestUseCase = listReservationsByGuestUseCase;

    }

    // Endpoint GET /api/reservas -> lista todas las reservas
    @GetMapping
    public List<ReservationResponseDTO> listReservations() {
        return listReservationsUseCase.execute();
    }

    @GetMapping("/huesped/{namePart}")
    public List<ReservationResponseDTO> getReservationsByGuest(@PathVariable("namePart") String namePart) {
        return listReservationsByGuestUseCase.execute(namePart);
    }
}
