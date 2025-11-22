package com.imperial.hotel.room.repository;

import com.imperial.hotel.room.model.Room;
import lombok.NonNull;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long>, JpaSpecificationExecutor<Room> {
    @Override
    @EntityGraph(attributePaths = { "roomType" })
    @NonNull
    List<Room> findAll(Specification<Room> spec);

    @Query("SELECT r FROM Room r WHERE r.id NOT IN (" +
            "SELECT o.room.id FROM Occupancy o " +
            "WHERE o.status = 'active' " +
            "AND ((o.checkinDatetime < :checkoutDatetime AND o.checkoutDatetime > :checkinDatetime) " +
            "OR (o.checkinDatetime < :checkoutDatetime AND o.checkoutDatetime IS NULL)))")
    List<Room> findAvailableRooms(@Param("checkinDatetime") LocalDateTime checkinDatetime,
            @Param("checkoutDatetime") LocalDateTime checkoutDatetime);
}
