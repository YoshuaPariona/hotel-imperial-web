package com.imperial.hotel.domain.room.repository;

import com.imperial.hotel.domain.room.model.RoomStatusHistory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RoomStatusHistoryRepository extends JpaRepository<RoomStatusHistory, Long> {
    List<RoomStatusHistory> findByRoom_RoomId(Long roomId);
}
