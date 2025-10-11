package com.imperial.hotel.domain.incident.model;

import com.imperial.hotel.domain.user.model.User;
import jakarta.persistence.*;
import lombok.*;
import java.time.OffsetDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@ToString(exclude = {"incident", "changedBy"})
@Entity
@Table(name = "incident_history")
public class IncidentHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "incident_history_id")
    @EqualsAndHashCode.Include
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "incident_id", nullable = false)
    private Incident incident;

    @Enumerated(EnumType.STRING)
    @Column(name = "old_status", nullable = false)
    private Incident.IncidentStatus oldStatus;

    @Enumerated(EnumType.STRING)
    @Column(name = "new_status", nullable = false)
    private Incident.IncidentStatus newStatus;

    @ManyToOne(fetch = FetchType.LAZY, optional = true)
    @JoinColumn(name = "changed_by")
    private User changedBy;

    @Column(name = "changed_at", nullable = false, updatable = false)
    private OffsetDateTime changedAt = OffsetDateTime.now();

    @Column(columnDefinition = "TEXT")
    private String note;
}
