package com.imperial.hotel.application.reservation.usecase;

import com.imperial.hotel.application.reservation.dto.ReservationResponseDTO;
import com.imperial.hotel.domain.reservation.repository.ReservationRepository;
import com.imperial.hotel.infrastructure.web.mapper.ReservationMapper;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ListReservationsByGuestUseCase {

    private final ReservationRepository reservationRepository;
    private final ReservationMapper reservationMapper;

    public ListReservationsByGuestUseCase(ReservationRepository reservationRepository,
                                          ReservationMapper reservationMapper) {
        this.reservationRepository = reservationRepository;
        this.reservationMapper = reservationMapper;
    }

    @Transactional
    public List<ReservationResponseDTO> execute(String guestNamePart) {
        return reservationRepository.findByGuestNameLike(guestNamePart)
                .stream()
                .map(reservationMapper::toResponseDTO)
                .toList();
    }
}
