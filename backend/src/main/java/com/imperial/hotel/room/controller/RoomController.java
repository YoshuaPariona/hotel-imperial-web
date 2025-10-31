package com.imperial.hotel.room.controller;

import com.imperial.hotel.room.dto.RoomListDTO;
import com.imperial.hotel.room.dto.RoomStatusDTO;
import com.imperial.hotel.room.service.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/rooms")
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

    @PutMapping("/status")
    public ResponseEntity<Void> updateRoomsStatus(@RequestBody RoomStatusDTO dto) {
        roomService.registerStatusChange(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(null);
    }
}
