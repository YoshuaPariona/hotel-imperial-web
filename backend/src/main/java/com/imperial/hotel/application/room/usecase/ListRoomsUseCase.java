package com.imperial.hotel.application.room.usecase;

import com.imperial.hotel.application.room.dto.RoomResponseDTO;
import com.imperial.hotel.domain.room.model.RoomStatus;
import com.imperial.hotel.domain.room.repository.RoomRepository;
import com.imperial.hotel.infrastructure.web.mapper.RoomMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ListRoomsUseCase {

    private final RoomRepository roomRepository;
    private final RoomMapper roomMapper;

    public ListRoomsUseCase(RoomRepository roomRepository, RoomMapper roomMapper) {
        this.roomRepository = roomRepository;
        this.roomMapper = roomMapper;
    }

    public List<RoomResponseDTO> execute(Optional<Integer> numeroMin, Optional<Integer> numeroMax, Optional<RoomStatus> status) {
        return roomRepository.findAll(status, numeroMin, numeroMax)
                .stream()
                .map(roomMapper::toResponseDTO)
                .collect(Collectors.toList());
    }
}
