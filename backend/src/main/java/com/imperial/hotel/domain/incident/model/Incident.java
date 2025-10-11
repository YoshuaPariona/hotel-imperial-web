package com.imperial.hotel.domain.incident.model;

import com.imperial.hotel.domain.room.model.Room;
import com.imperial.hotel.domain.user.model.User;
import jakarta.persistence.*;
import lombok.*;
import java.time.OffsetDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@ToString(exclude = {"reportedBy", "handledBy", "room"})
@Entity
@Table(name = "incidents")
public class Incident {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "incident_id")
    @EqualsAndHashCode.Include
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = false)
    private IncidentType type;

    @Enumerated(EnumType.STRING)
    @Column(name = "area", nullable = false)
    private IncidentArea area;

    @Column(name = "location_detail", length = 100)
    private String locationDetail;

    @Column(name = "description", nullable = false, columnDefinition = "TEXT")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(name = "priority", nullable = false)
    private IncidentPriority priority = IncidentPriority.MEDIA;

    @Column(name = "team", nullable = false, length = 50)
    private String team;

    @Column(name = "reported_at", nullable = false, updatable = false)
    private OffsetDateTime reportedAt = OffsetDateTime.now();

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private IncidentStatus status = IncidentStatus.PENDIENTE;

    @ManyToOne(fetch = FetchType.LAZY, optional = true)
    @JoinColumn(name = "reported_by")
    private User reportedBy;

    @ManyToOne(fetch = FetchType.LAZY, optional = true)
    @JoinColumn(name = "handled_by")
    private User handledBy;

    @ManyToOne(fetch = FetchType.LAZY, optional = true)
    @JoinColumn(name = "room_id")
    private Room room;

    public enum IncidentType {
        MANTENIMIENTO, LIMPIEZA, RUIDO, DETERIORO_MOBILIARIO, FUGA_AGUA, ELECTRICIDAD
    }

    public enum IncidentArea {
        HABITACION, LAVABO, PASILLO, AREA_COMUN, COCINA, ASCENSOR
    }

    public enum IncidentPriority {
        BAJA, MEDIA, ALTA, CRITICA
    }

    public enum IncidentStatus {
        PENDIENTE, EN_PROCESO, RESUELTA
    }
}
