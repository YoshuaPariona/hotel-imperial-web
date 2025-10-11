package com.imperial.hotel.infrastructure.jpa.room;

import com.imperial.hotel.domain.room.model.Room;
import com.imperial.hotel.domain.room.model.RoomStatus;
import com.imperial.hotel.domain.room.model.RoomStatusHistory;
import com.imperial.hotel.domain.room.repository.RoomRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RoomJpaRepository extends JpaRepository<Room, Long>, RoomRepository {

    @Override
    @Query("""
        SELECT r FROM Room r 
        LEFT JOIN FETCH r.roomType rt
        WHERE (:status IS NULL OR r.currentStatus = :status) 
          AND (:numeroMin IS NULL OR CAST(r.roomNumber AS int) >= :numeroMin) 
          AND (:numeroMax IS NULL OR CAST(r.roomNumber AS int) <= :numeroMax)
    """)
    List<Room> findAll(Optional<RoomStatus> status, Optional<Integer> numeroMin, Optional<Integer> numeroMax);

    @Override
    Optional<Room> findById(Long id);

    @Override
    @Query("SELECT h FROM RoomStatusHistory h WHERE h.room.id = :roomId ORDER BY h.changedAt DESC")
    List<RoomStatusHistory> findStatusHistoryByRoomId(Long roomId);

    @Override
    @Query("SELECT COUNT(r) > 0 FROM Reservation r WHERE r.room.id = :roomId AND r.status IN ('ACTIVA','RESERVADA')")
    boolean existsActiveReservationOrHistory(Long roomId);
}
