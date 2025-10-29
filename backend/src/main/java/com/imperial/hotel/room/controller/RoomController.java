package com.imperial.hotel.room.controller;

import com.imperial.hotel.room.dto.RoomResponseDTO;
import com.imperial.hotel.room.service.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/rooms")
@RequiredArgsConstructor
public class RoomController {

    private final RoomService roomService;

    @GetMapping
    public ResponseEntity<List<RoomResponseDTO>> getAll() {
        return ResponseEntity.ok(roomService.findAll());
    }
}
