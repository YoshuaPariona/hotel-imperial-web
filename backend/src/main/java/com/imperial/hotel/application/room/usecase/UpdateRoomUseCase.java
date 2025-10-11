package com.imperial.hotel.application.room.usecase;

import com.imperial.hotel.application.room.dto.UpdateRoomRequestDTO;
import com.imperial.hotel.application.room.dto.RoomResponseDTO;
import com.imperial.hotel.domain.room.model.Room;
import com.imperial.hotel.domain.room.model.RoomStatus;
import com.imperial.hotel.domain.room.model.RoomType;
import com.imperial.hotel.domain.room.repository.RoomRepository;
import com.imperial.hotel.infrastructure.web.mapper.RoomMapper;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
public class UpdateRoomUseCase {

    private final RoomRepository roomRepository;
    private final RoomMapper roomMapper;

    public UpdateRoomUseCase(RoomRepository roomRepository, RoomMapper roomMapper) {
        this.roomRepository = roomRepository;
        this.roomMapper = roomMapper;
    }

    // Cambiamos roomId por roomNumber
    public RoomResponseDTO execute(String roomNumber, UpdateRoomRequestDTO dto) {
        Room room = roomRepository.findByRoomNumber(roomNumber)
                .orElseThrow(() -> new NoSuchElementException("Habitación no encontrada con número: " + roomNumber));

        if (dto.getRoomNumber() != null) {
            room.setRoomNumber(dto.getRoomNumber());
        }

        if (dto.getCurrentStatus() != null) {
            try {
                RoomStatus status = RoomStatus.valueOf(dto.getCurrentStatus().toUpperCase());
                room.setCurrentStatus(status);
            } catch (IllegalArgumentException e) {
                throw new IllegalArgumentException("Estado de habitación inválido: " + dto.getCurrentStatus());
            }
        }

        if (dto.getRoomTypeCategory() != null) {
            RoomType type = room.getRoomType();
            if (type != null) {
                type.setCategory(dto.getRoomTypeCategory());
            }
        }

        if (dto.getNote() != null) {
            room.setNote(dto.getNote());
        }

        roomRepository.save(room);
        return roomMapper.toResponseDTO(room);
    }
}
