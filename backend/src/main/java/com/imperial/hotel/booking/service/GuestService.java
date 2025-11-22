package com.imperial.hotel.booking.service;

import com.imperial.hotel.booking.dto.GuestDTO;
import com.imperial.hotel.booking.mapper.ReservationMapper;
import com.imperial.hotel.booking.repository.GuestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GuestService {
    private final GuestRepository guestRepository;
    private final ReservationMapper reservationMapper;

    @Transactional(readOnly = true)
    public List<GuestDTO> searchGuests(String query) {
        if (query == null || query.trim().isEmpty()) {
            return guestRepository.findAll().stream()
                    .map(reservationMapper::toGuestDTO)
                    .limit(50)
                    .collect(Collectors.toList());
        }

        return guestRepository.searchGuests(query).stream()
                .map(reservationMapper::toGuestDTO)
                .collect(Collectors.toList());
    }
}
