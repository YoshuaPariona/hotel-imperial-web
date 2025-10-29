package com.imperial.hotel.room.controller;

import com.imperial.hotel.room.dto.RoomListDTO;
import com.imperial.hotel.room.service.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rooms")
@RequiredArgsConstructor
public class RoomController {
    private final RoomService roomService;

    @GetMapping
    public ResponseEntity<List<RoomListDTO>> getRoomsByFilter(
            @RequestParam(required = false) String number,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String currentStatus) {

        if (number == null && category == null && currentStatus == null) {
            return ResponseEntity.ok(roomService.findAll());
        }

        return ResponseEntity.ok(roomService.findAllByFilter(number, category, currentStatus));
    }
}
