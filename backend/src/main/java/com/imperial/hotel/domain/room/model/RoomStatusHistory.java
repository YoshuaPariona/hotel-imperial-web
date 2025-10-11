package com.imperial.hotel.domain.room.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.OffsetDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "room_status_history")
public class RoomStatusHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long roomStatusHistoryId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id", nullable = false,
            foreignKey = @ForeignKey(name = "fk_room_history_room"))
    private Room room;

    @Column(name = "previous_status", nullable = false, length = 20)
    private String previousStatus;

    @Column(name = "new_status", nullable = false, length = 20)
    private String newStatus;

    @Column(name = "changed_by")
    private Long changedBy; // id del usuario que realizó el cambio

    @Column(name = "changed_at", columnDefinition = "TIMESTAMP WITH TIME ZONE", nullable = false)
    private OffsetDateTime changedAt = OffsetDateTime.now();

    @Column(columnDefinition = "TEXT")
    private String note;

    // Métodos convenientes para usar enums
    public RoomStatus getPreviousStatusEnum() {
        return RoomStatus.valueOf(this.previousStatus);
    }

    public void setPreviousStatusEnum(RoomStatus status) {
        this.previousStatus = status.name();
    }

    public RoomStatus getNewStatusEnum() {
        return RoomStatus.valueOf(this.newStatus);
    }

    public void setNewStatusEnum(RoomStatus status) {
        this.newStatus = status.name();
    }
}
