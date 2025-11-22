package com.imperial.hotel.booking.controller;

import com.imperial.hotel.booking.dto.*;
import com.imperial.hotel.booking.service.ReservationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/reservations")
@RequiredArgsConstructor
public class ReservationController {
    private final ReservationService reservationService;

    @GetMapping
    public ResponseEntity<List<ReservationListDTO>> getAllReservations() {
        return ResponseEntity.ok(reservationService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ReservationDetailDTO> getReservationById(@PathVariable Long id) {
        return ResponseEntity.ok(reservationService.findById(id));
    }

    @PostMapping
    public ResponseEntity<ReservationDetailDTO> createReservation(
            @Valid @RequestBody CreateReservationDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(reservationService.create(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ReservationDetailDTO> updateReservation(
            @PathVariable Long id,
            @Valid @RequestBody UpdateReservationDTO dto) {
        return ResponseEntity.ok(reservationService.update(id, dto));
    }

    @PutMapping("/{id}/cancel")
    public ResponseEntity<ReservationDetailDTO> cancelReservation(
            @PathVariable Long id,
            @Valid @RequestBody CancelReservationDTO dto) {
        return ResponseEntity.ok(reservationService.cancel(id, dto));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<ReservationDetailDTO> updateReservationStatus(
            @PathVariable Long id,
            @RequestBody Map<String, String> statusUpdate) {
        String status = statusUpdate.get("status");
        return ResponseEntity.ok(reservationService.updateStatus(id, status));
    }
}
