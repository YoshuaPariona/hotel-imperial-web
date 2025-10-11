package com.imperial.hotel.application.room.usecase;

import com.imperial.hotel.application.room.dto.RoomResponseDTO;
import com.imperial.hotel.domain.room.model.Room;
import com.imperial.hotel.domain.room.repository.RoomRepository;
import com.imperial.hotel.infrastructure.web.mapper.RoomMapper;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
public class GetRoomByIdUseCase {

    private final RoomRepository roomRepository;
    private final RoomMapper roomMapper;

    public GetRoomByIdUseCase(RoomRepository roomRepository, RoomMapper roomMapper) {
        this.roomRepository = roomRepository;
        this.roomMapper = roomMapper;
    }

    public RoomResponseDTO execute(Long roomId) {
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new NoSuchElementException("Habitación no encontrada con id: " + roomId));

        return roomMapper.toResponseDTO(room);
    }
}
