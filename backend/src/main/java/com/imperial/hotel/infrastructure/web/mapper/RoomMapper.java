package com.imperial.hotel.infrastructure.web.mapper;

import com.imperial.hotel.application.room.dto.RoomResponseDTO;
import com.imperial.hotel.domain.room.model.Room;
import org.springframework.stereotype.Component;

@Component
public class RoomMapper {

    public RoomResponseDTO toResponseDTO(Room room) {
        if (room == null) return null;

        return RoomResponseDTO.builder()
                .id(room.getRoomId()) // Usar roomId que es el @Id
                .roomNumber(room.getRoomNumber())
                .currentStatus(room.getCurrentStatus().name())
                .roomTypeCategory(
                        room.getRoomType() != null && room.getRoomType().getCategory() != null
                                ? room.getRoomType().getCategory() // es String, no enum
                                : null
                )
                .build();
    }
}
