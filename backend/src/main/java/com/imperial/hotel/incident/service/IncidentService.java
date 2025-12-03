package com.imperial.hotel.incident.service;

import com.imperial.hotel.incident.model.IncidentTypeCount;
import com.imperial.hotel.incident.repository.IncidentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class IncidentService {

    private final IncidentRepository incidentRepository;

    public List<IncidentTypeCount> getIncidentTypeCounts() {
        return incidentRepository.countIncidentsByType();
    }
}
