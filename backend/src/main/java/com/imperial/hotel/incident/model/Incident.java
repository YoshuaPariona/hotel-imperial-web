package com.imperial.hotel.incident.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "incident")
public class Incident {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "incident_id")
    private Long incidentId;

    @Column(name = "type", nullable = false, length = 50)
    private String type;

    @Column(name = "area", nullable = false, length = 50)
    private String area;

    @Column(name = "location_detail", length = 100)
    private String locationDetail;

    @Column(name = "description", nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(name = "priority", nullable = false, length = 20)
    private String priority;

    @Column(name = "team", nullable = false, length = 50)
    private String team;

    @Column(name = "reported_at", nullable = false, updatable = false, insertable = false)
    private java.time.LocalDateTime reportedAt;

    @Column(name = "status", nullable = false, length = 20)
    private String status;

    @Column(name = "reported_by", nullable = false)
    private Long reportedBy;

    @Column(name = "handled_by")
    private Long handledBy;

    @Column(name = "room_id")
    private Long roomId;
}
