package com.imperial.hotel.domain.reservation.repository;

import com.imperial.hotel.domain.reservation.model.Reservation;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ReservationRepository {

    List<Reservation> findAll();

    @Query("""
        SELECT r FROM Reservation r
        JOIN r.guest g
        WHERE LOWER(g.firstName) LIKE LOWER(CONCAT('%', :guestNamePart, '%'))
           OR LOWER(g.lastName) LIKE LOWER(CONCAT('%', :guestNamePart, '%'))
    """)
    List<Reservation> findByGuestNameLike(String guestNamePart);

    @Query("""
    SELECT r FROM Reservation r
    JOIN r.room ro
    WHERE ro.roomNumber LIKE CONCAT('%', :roomNumberPart, '%')
""")
    List<Reservation> findByRoomNumberLike(String roomNumberPart);
}
