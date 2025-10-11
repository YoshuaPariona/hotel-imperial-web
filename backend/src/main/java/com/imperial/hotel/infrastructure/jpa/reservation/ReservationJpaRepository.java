package com.imperial.hotel.infrastructure.jpa.reservation;

import com.imperial.hotel.domain.reservation.model.Reservation;
import com.imperial.hotel.domain.reservation.repository.ReservationRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReservationJpaRepository extends JpaRepository<Reservation, Long>, ReservationRepository {

    @Override
    List<Reservation> findAll();
}
