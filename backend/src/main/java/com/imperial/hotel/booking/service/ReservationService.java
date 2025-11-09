package com.imperial.hotel.booking.service;

import com.imperial.hotel.booking.dto.ReservationListDTO;
import com.imperial.hotel.booking.mapper.ReservationMapper;
import com.imperial.hotel.booking.repository.ReservationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReservationService {

    private final ReservationRepository reservationRepository;
    private final ReservationMapper reservationMapper;

    @Transactional(readOnly = true)
    public List<ReservationListDTO> findAll () {
        return reservationRepository.findAll().stream()
                .map(reservationMapper::ToListDTO)
                .toList();
    }

}
