package com.imperial.hotel.infrastructure.web.controller;

import com.imperial.hotel.application.room.dto.RoomResponseDTO;
import com.imperial.hotel.application.room.usecase.GetRoomByIdUseCase;
import com.imperial.hotel.application.room.usecase.ListRoomsUseCase;
import com.imperial.hotel.domain.room.model.RoomStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/habitaciones")
public class RoomController {

    private final ListRoomsUseCase listRoomsUseCase;
    private final GetRoomByIdUseCase getRoomByIdUseCase;

    // Constructor único, Spring lo inyectará automáticamente
    public RoomController(ListRoomsUseCase listRoomsUseCase, GetRoomByIdUseCase getRoomByIdUseCase) {
        this.listRoomsUseCase = listRoomsUseCase;
        this.getRoomByIdUseCase = getRoomByIdUseCase;
    }

    // Endpoint GET /api/habitaciones -> lista habitaciones con filtros opcionales
    @GetMapping
    public List<RoomResponseDTO> listRooms(
            @RequestParam Optional<Integer> numeroMin,
            @RequestParam Optional<Integer> numeroMax,
            @RequestParam Optional<RoomStatus> status
    ) {
        return listRoomsUseCase.execute(numeroMin, numeroMax, status);
    }

    // Endpoint GET /api/habitaciones/{id} -> obtiene una habitación específica
    @GetMapping("/{id}")
    public RoomResponseDTO getRoomById(@PathVariable Long id) {
        return getRoomByIdUseCase.execute(id);
    }
}
