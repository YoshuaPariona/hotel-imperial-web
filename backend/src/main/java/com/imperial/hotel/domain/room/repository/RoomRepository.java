package com.imperial.hotel.domain.room.repository;

import com.imperial.hotel.domain.room.model.Room;
import com.imperial.hotel.domain.room.model.RoomStatus;
import com.imperial.hotel.domain.room.model.RoomStatusHistory;
import java.util.List;
import java.util.Optional;

public interface RoomRepository {

    List<Room> findAll(Optional<RoomStatus> status, Optional<Integer> numeroMin, Optional<Integer> numeroMax);

    List<Room> findByRoomTypeCategory(String category);

    Optional<Room> findById(Long id);

    Optional<Room> findByRoomNumber(String roomNumber);

    List<Room> findByCurrentStatus(RoomStatus status);

    Room save(Room room);

    void deleteById(Long id);

    List<RoomStatusHistory> findStatusHistoryByRoomId(Long roomId);

    boolean existsActiveReservationOrHistory(Long roomId);
}
