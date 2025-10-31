package com.imperial.hotel.occupancy.service;

import com.imperial.hotel.occupancy.dto.OccupancyListDTO;
import com.imperial.hotel.occupancy.mapper.OccupancyMapper;
import com.imperial.hotel.occupancy.repository.OccupancyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OccupancyService {

    private final OccupancyRepository occupancyRepository;
    private final OccupancyMapper occupancyMapper;

    @Transactional(readOnly = true)
    public List<OccupancyListDTO> findAll () {
        return occupancyRepository.findAll().stream()
                .map(occupancyMapper::ToListDTO)
                .toList();
    }

}
