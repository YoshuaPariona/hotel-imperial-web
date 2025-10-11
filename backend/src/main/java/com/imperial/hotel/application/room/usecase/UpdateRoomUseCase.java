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

    public RoomResponseDTO execute(Long roomId, UpdateRoomRequestDTO dto) {
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new NoSuchElementException("Habitación no encontrada con id: " + roomId));

        if (dto.getRoomNumber() != null) {
            room.setRoomNumber(dto.getRoomNumber());
        }

        if (dto.getCurrentStatus() != null) {
            room.setCurrentStatus(dto.getCurrentStatus()); // puedes validar que sea un RoomStatus válido
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
