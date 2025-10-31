package com.imperial.hotel.room.service;

import com.imperial.hotel.room.dto.RoomListDTO;
import com.imperial.hotel.room.dto.RoomStatusDTO;
import com.imperial.hotel.room.mapper.RoomMapper;
import com.imperial.hotel.room.model.Room;
import com.imperial.hotel.room.model.RoomStatusHistory;
import com.imperial.hotel.room.repository.RoomRepository;
import com.imperial.hotel.room.repository.RoomStatusHistoryRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RoomService {
    private final RoomRepository roomRepository;
    private final RoomStatusHistoryRepository roomStatusHistoryRepository;
    private final RoomMapper roomMapper;

    @Transactional(readOnly = true)
    public List<RoomListDTO> findAll() {
        return roomRepository.findAll().stream()
                .map(roomMapper::toListDTO)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<RoomListDTO> findAllByFilter(String number, String category, String currentStatus) {
        Specification<Room> spec = (root, query, cb) -> cb.conjunction();

        if(number != null && !number.isEmpty()) {
            spec = spec.and((root, query, cb) ->
                    cb.like(cb.upper(root.get("number")), "%" + number + "%"));
        }

        if(category != null && !category.isEmpty()) {
            spec = spec.and((root, query, cb) ->
                    cb.equal(cb.upper(root.get("roomType").get("category")), category));
        }

        if(currentStatus != null && !currentStatus.isEmpty()) {
            spec = spec.and((root, query, cb) ->
                    cb.equal(cb.upper(root.get("currentStatus")), currentStatus));
        }

        return roomRepository.findAll(spec).stream()
                .map(roomMapper::toListDTO)
                .collect(Collectors.toList());
    }

    public RoomStatusHistory registerStatusChange(RoomStatusDTO dto) {
        RoomStatusHistory history = roomMapper.toStatusEntity(dto);

        // obtener el estado previo
        Room room = roomRepository.findById(dto.getRoomId())
                .orElseThrow(() -> new EntityNotFoundException("Room not found"));
        history.setPreviousStatus(room.getCurrentStatus());

        // actualizar estado actual de la habitación
        room.setCurrentStatus(dto.getNewStatus());
        roomRepository.save(room);

        return roomStatusHistoryRepository.save(history);
    }
}
