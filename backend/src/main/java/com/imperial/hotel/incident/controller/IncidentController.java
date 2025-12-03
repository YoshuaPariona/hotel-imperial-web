package com.imperial.hotel.incident.controller;

import com.imperial.hotel.incident.model.IncidentTypeCount;
import com.imperial.hotel.incident.service.IncidentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/incidents")
@RequiredArgsConstructor
public class IncidentController {

    private final IncidentService incidentService;

    @GetMapping("/types/count")
    public List<IncidentTypeCount> getIncidentTypeCounts() {

        return incidentService.getIncidentTypeCounts();
    }
}
