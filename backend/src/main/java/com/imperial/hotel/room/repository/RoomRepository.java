package com.imperial.hotel.room.repository;

import com.imperial.hotel.room.model.Room;
import lombok.NonNull;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long>, JpaSpecificationExecutor<Room> {
    @Override
    @EntityGraph(attributePaths = {"roomType"})
    @NonNull
    List<Room> findAll(Specification<Room> spec);
}
