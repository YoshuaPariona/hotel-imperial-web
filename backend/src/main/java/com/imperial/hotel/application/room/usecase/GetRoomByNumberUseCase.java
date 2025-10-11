package com.imperial.hotel.application.room.usecase;

import com.imperial.hotel.application.room.dto.RoomResponseDTO;
import com.imperial.hotel.domain.room.model.Room;
import com.imperial.hotel.domain.room.repository.RoomRepository;
import com.imperial.hotel.infrastructure.web.mapper.RoomMapper;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
public class GetRoomByNumberUseCase {

    private final RoomRepository roomRepository;
    private final RoomMapper roomMapper;

    public GetRoomByNumberUseCase(RoomRepository roomRepository, RoomMapper roomMapper) {
        this.roomRepository = roomRepository;
        this.roomMapper = roomMapper;
    }

    public RoomResponseDTO execute(String roomNumber) {
        Room room = roomRepository.findByRoomNumber(roomNumber)
                .orElseThrow(() -> new NoSuchElementException("Habitación no encontrada con número: " + roomNumber));

        return roomMapper.toResponseDTO(room);
    }
}
