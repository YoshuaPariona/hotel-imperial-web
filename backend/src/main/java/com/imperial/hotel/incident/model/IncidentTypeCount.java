package com.imperial.hotel.incident.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class IncidentTypeCount {
    private String type;
    private Long count;
}
