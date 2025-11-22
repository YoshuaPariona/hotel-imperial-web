package com.imperial.hotel.booking.controller;

import com.imperial.hotel.booking.dto.GuestDTO;
import com.imperial.hotel.booking.service.GuestService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/guests")
@RequiredArgsConstructor
public class GuestController {
    private final GuestService guestService;

    @GetMapping("/search")
    public ResponseEntity<List<GuestDTO>> searchGuests(
            @RequestParam(required = false) String q) {
        return ResponseEntity.ok(guestService.searchGuests(q));
    }
}
