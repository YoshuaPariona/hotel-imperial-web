package com.imperial.hotel.infrastructure.web.controller;

import com.imperial.hotel.application.room.dto.RoomResponseDTO;
import com.imperial.hotel.application.room.usecase.ListRoomsUseCase;
import com.imperial.hotel.domain.room.model.RoomStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/habitaciones")
public class RoomController {

    private final ListRoomsUseCase listRoomsUseCase;

    public RoomController(ListRoomsUseCase listRoomsUseCase) {
        this.listRoomsUseCase = listRoomsUseCase;
    }

    @GetMapping
    public List<RoomResponseDTO> listRooms(
            @RequestParam Optional<Integer> numeroMin,
            @RequestParam Optional<Integer> numeroMax,
            @RequestParam Optional<RoomStatus> status
    ) {
        return listRoomsUseCase.execute(numeroMin, numeroMax, status);
    }
}
