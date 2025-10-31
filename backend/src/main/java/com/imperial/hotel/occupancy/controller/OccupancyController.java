package com.imperial.hotel.occupancy.controller;

import com.imperial.hotel.occupancy.dto.OccupancyListDTO;
import com.imperial.hotel.occupancy.service.OccupancyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/occupancies")
@RequiredArgsConstructor
public class OccupancyController {

    private final OccupancyService occupancyService;

    @GetMapping
    public ResponseEntity<List<OccupancyListDTO>> getAllOccupancies(){
        return ResponseEntity.ok(occupancyService.findAll());
    }
}
