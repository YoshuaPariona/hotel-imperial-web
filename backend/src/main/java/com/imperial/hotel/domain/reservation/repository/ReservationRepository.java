package com.imperial.hotel.domain.reservation.repository;

import com.imperial.hotel.domain.reservation.model.Reservation;

import java.util.List;

public interface ReservationRepository {

    List<Reservation> findAll();
}
