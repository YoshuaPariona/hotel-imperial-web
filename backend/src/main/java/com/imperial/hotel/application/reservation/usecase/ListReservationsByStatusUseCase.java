package com.imperial.hotel.application.reservation.usecase;

import com.imperial.hotel.application.reservation.dto.ReservationResponseDTO;
import com.imperial.hotel.domain.reservation.repository.ReservationRepository;
import com.imperial.hotel.infrastructure.web.mapper.ReservationMapper;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ListReservationsByStatusUseCase {

    private final ReservationRepository reservationRepository;
    private final ReservationMapper reservationMapper;

    public ListReservationsByStatusUseCase(ReservationRepository reservationRepository,
                                           ReservationMapper reservationMapper) {
        this.reservationRepository = reservationRepository;
        this.reservationMapper = reservationMapper;
    }

    @Transactional
    public List<ReservationResponseDTO> execute(String status) {
        if ("TODOS".equalsIgnoreCase(status)) {
            // Si es "TODOS", retornamos todo
            return reservationRepository.findAll()
                    .stream()
                    .map(reservationMapper::toResponseDTO)
                    .toList();
        }

        // Filtramos por estado exacto
        return reservationRepository.findByStatus(status.toUpperCase())
                .stream()
                .map(reservationMapper::toResponseDTO)
                .toList();
    }
}
