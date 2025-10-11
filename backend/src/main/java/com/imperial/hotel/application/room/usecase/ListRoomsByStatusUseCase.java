package com.imperial.hotel.application.room.usecase;

import com.imperial.hotel.application.room.dto.RoomResponseDTO;
import com.imperial.hotel.domain.room.model.RoomStatus;
import com.imperial.hotel.domain.room.repository.RoomRepository;
import com.imperial.hotel.infrastructure.web.mapper.RoomMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ListRoomsByStatusUseCase {

    private final RoomRepository roomRepository;
    private final RoomMapper roomMapper;

    public ListRoomsByStatusUseCase(RoomRepository roomRepository, RoomMapper roomMapper) {
        this.roomRepository = roomRepository;
        this.roomMapper = roomMapper;
    }

    public List<RoomResponseDTO> execute(RoomStatus status) {
        return roomRepository.findByCurrentStatus(status)
                .stream()
                .map(roomMapper::toResponseDTO)
                .toList();
    }
}
