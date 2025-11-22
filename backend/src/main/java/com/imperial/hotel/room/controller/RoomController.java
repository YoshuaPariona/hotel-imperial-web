package com.imperial.hotel.room.controller;

import com.imperial.hotel.room.dto.RoomListDTO;
import com.imperial.hotel.room.dto.RoomStatusDTO;
import com.imperial.hotel.room.service.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
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

    @PutMapping("/{roomId}/status")
    public ResponseEntity<Void> updateRoomsStatus(
            @RequestBody RoomStatusDTO dto,
            @PathVariable Long roomId) {
        roomService.registerStatusChange(roomId, dto);
        return ResponseEntity.ok(null);
    }

    @GetMapping("/available")
    public ResponseEntity<List<RoomListDTO>> getAvailableRooms(
            @RequestParam LocalDate checkinDate,
            @RequestParam LocalDate checkoutDate) {
        return ResponseEntity.ok(roomService.getAvailableRooms(checkinDate, checkoutDate));
    }
}
