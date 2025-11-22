package com.imperial.hotel.booking.repository;

import com.imperial.hotel.booking.model.Occupancy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface OccupancyRepository extends JpaRepository<Occupancy, Long> {
    List<Occupancy> findByReservationId(Long reservationId);

    Optional<Occupancy> findByReservationIdAndStatus(Long reservationId, String status);

    @Query("SELECT o FROM Occupancy o WHERE o.room.id = :roomId " +
            "AND o.status = 'active' " +
            "AND ((o.checkinDatetime <= :checkoutDatetime AND o.checkoutDatetime >= :checkinDatetime) " +
            "OR (o.checkinDatetime <= :checkoutDatetime AND o.checkoutDatetime IS NULL))")
    List<Occupancy> findConflictingOccupancies(
            @Param("roomId") Long roomId,
            @Param("checkinDatetime") LocalDateTime checkinDatetime,
            @Param("checkoutDatetime") LocalDateTime checkoutDatetime);
}
