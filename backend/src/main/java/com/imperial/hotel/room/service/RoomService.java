package com.imperial.hotel.room.service;

import com.imperial.hotel.room.dto.RoomResponseDTO;
import com.imperial.hotel.room.mapper.RoomMapper;
import com.imperial.hotel.room.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RoomService {
    private final RoomRepository roomRepository;
    private final RoomMapper roomMapper;

    @Transactional(readOnly = true)
    public List<RoomResponseDTO> findAll() {
        return roomRepository.findAll()
                .stream()
                .map(roomMapper::toDTO)
                .toList();
    }
}
