package com.imperial.hotel.infrastructure.web.controller;

import com.imperial.hotel.application.reservation.dto.ReservationResponseDTO;
import com.imperial.hotel.application.reservation.usecase.ListReservationsByGuestUseCase;
import com.imperial.hotel.application.reservation.usecase.ListReservationsByRoomUseCase;
import com.imperial.hotel.application.reservation.usecase.ListReservationsByStatusUseCase;
import com.imperial.hotel.application.reservation.usecase.ListReservationsUseCase;
import com.imperial.hotel.domain.reservation.repository.ReservationRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reservas")
public class ReservationController {

    private final ListReservationsUseCase listReservationsUseCase;
    private final ListReservationsByGuestUseCase listReservationsByGuestUseCase;
    private final ListReservationsByRoomUseCase listReservationsByRoomUseCase;
    private final ListReservationsByStatusUseCase listReservationsByStatusUseCase;


    public ReservationController(ListReservationsUseCase listReservationsUseCase,
                                 ListReservationsByGuestUseCase listReservationsByGuestUseCase,
                                 ListReservationsByRoomUseCase listReservationsByRoomUseCase,
                                 ListReservationsByStatusUseCase listReservationsByStatusUseCase) {
        this.listReservationsUseCase = listReservationsUseCase;
        this.listReservationsByGuestUseCase = listReservationsByGuestUseCase;
        this.listReservationsByRoomUseCase = listReservationsByRoomUseCase;
        this.listReservationsByStatusUseCase = listReservationsByStatusUseCase;

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

    @GetMapping("/habitacion/{numberPart}")
    public List<ReservationResponseDTO> getReservationsByRoom(@PathVariable("numberPart") String numberPart) {
        return listReservationsByRoomUseCase.execute(numberPart);
    }

    @GetMapping("/estado/{status}")
    public List<ReservationResponseDTO> getReservationsByStatus(@PathVariable("status") String status) {
        return listReservationsByStatusUseCase.execute(status);
    }
}
