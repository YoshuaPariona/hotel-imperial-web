package com.imperial.hotel.booking.mapper;

import com.imperial.hotel.booking.dto.ReservationListDTO;
import com.imperial.hotel.booking.model.Reservation;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;


@Mapper(
        componentModel = "spring"
)
public interface ReservationMapper {
    @Mapping(target = "roomNumber", source = "room.number")
    @Mapping(target = "guestName", expression = "java(reservation.getGuest().getFirstName() + \" \" + reservation.getGuest().getLastName())")
    ReservationListDTO ToListDTO(Reservation reservation);
}
