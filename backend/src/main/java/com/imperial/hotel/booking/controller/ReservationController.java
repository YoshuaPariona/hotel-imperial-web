package com.imperial.hotel.booking.controller;

import com.imperial.hotel.booking.dto.ReservationListDTO;
import com.imperial.hotel.booking.service.ReservationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/reservations")
@RequiredArgsConstructor
public class ReservationController {

    private final ReservationService reservationService;

    @GetMapping
    public ResponseEntity<List<ReservationListDTO>> getAll(){
        return ResponseEntity.ok(reservationService.findAll());
    }
}
