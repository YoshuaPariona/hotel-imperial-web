package com.imperial.hotel.infrastructure.web.controller;

import com.imperial.hotel.application.room.dto.RoomResponseDTO;
import com.imperial.hotel.application.room.dto.UpdateRoomRequestDTO;
import com.imperial.hotel.application.room.usecase.*;
import com.imperial.hotel.domain.room.model.RoomStatus;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/habitaciones")
public class RoomController {

    private final ListRoomsUseCase listRoomsUseCase;
    private final GetRoomByNumberUseCase getRoomByNumberUseCase;
    private final UpdateRoomUseCase updateRoomUseCase;
    private final ListRoomsByStatusUseCase listRoomsByStatusUseCase;
    private final ListRoomsByCategoryUseCase listRoomsByCategoryUseCase;


    public RoomController(ListRoomsUseCase listRoomsUseCase,
                          GetRoomByNumberUseCase getRoomByNumberUseCase,
                          UpdateRoomUseCase updateRoomUseCase,
                          ListRoomsByStatusUseCase listRoomsByStatusUseCase,
                          ListRoomsByCategoryUseCase listRoomsByCategoryUseCase) {
        this.listRoomsUseCase = listRoomsUseCase;
        this.getRoomByNumberUseCase = getRoomByNumberUseCase;
        this.updateRoomUseCase = updateRoomUseCase;
        this.listRoomsByStatusUseCase = listRoomsByStatusUseCase;
        this.listRoomsByCategoryUseCase = listRoomsByCategoryUseCase;
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

    // Endpoint GET /api/habitaciones/numero/{roomNumber} -> obtiene una habitación por número
    @GetMapping("/numero/{roomNumber}")
    public RoomResponseDTO getRoomByNumber(@PathVariable String roomNumber) {
        return getRoomByNumberUseCase.execute(roomNumber);
    }

    // Endpoint PUT /api/habitaciones/numero/{roomNumber} -> actualiza habitación por número
    @PutMapping("/numero/{roomNumber}")
    public RoomResponseDTO updateRoom(
            @PathVariable String roomNumber,
            @RequestBody UpdateRoomRequestDTO dto
    ) {
        return updateRoomUseCase.execute(roomNumber, dto);
    }

    @GetMapping("/estado/{estado}")
    public List<RoomResponseDTO> getRoomsByStatus(@PathVariable String estado) {
        RoomStatus status;
        try {
            status = RoomStatus.valueOf(estado.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Estado inválido");
        }
        return listRoomsByStatusUseCase.execute(status);
    }

    @GetMapping("/categoria/{category}")
    public List<RoomResponseDTO> getRoomsByCategory(@PathVariable String category) {
        return listRoomsByCategoryUseCase.execute(category);
    }

}
