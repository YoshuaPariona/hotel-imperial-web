package com.imperial.hotel.infrastructure.web.mapper;

import com.imperial.hotel.application.reservation.dto.ReservationResponseDTO;
import com.imperial.hotel.domain.reservation.model.Reservation;
import org.springframework.stereotype.Component;

@Component
public class ReservationMapper {

    public ReservationResponseDTO toResponseDTO(Reservation reservation) {
        if (reservation == null) return null;

        return ReservationResponseDTO.builder()
                .reservationId(reservation.getReservationId())
                .roomNumber(reservation.getRoom() != null ? reservation.getRoom().getRoomNumber() : null)
                .guestName(reservation.getGuest() != null
                        ? reservation.getGuest().getFirstName() + " " + reservation.getGuest().getLastName()
                        : null)
                .checkIn(reservation.getCheckIn())
                .checkOut(reservation.getCheckOut())
                .status(reservation.getStatus())
                .build();
    }
}
