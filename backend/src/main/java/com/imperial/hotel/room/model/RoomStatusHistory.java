package com.imperial.hotel.room.model;

import com.imperial.hotel.auth.model.Employee;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "room_status_history")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RoomStatusHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "room_status_history_id")
    private Long id;

    @NotNull(message = "La habitación es obligatoria")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id", nullable = false, foreignKey = @ForeignKey(name = "fk_room_history_room"))
    private Room room;

    @NotNull(message = "El usuario que realizó el cambio es obligatorio")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "changed_by", nullable = false, foreignKey = @ForeignKey(name = "fk_room_history_employee"))
    private Employee changedBy;

    @NotBlank(message = "El estado anterior es obligatorio")
    @Size(max = 20, message = "El estado anterior no puede exceder 20 caracteres")
    @Column(name = "previous_status", nullable = false, length = 20)
    private String previousStatus;

    @NotBlank(message = "El nuevo estado es obligatorio")
    @Size(max = 20, message = "El nuevo estado no puede exceder 20 caracteres")
    @Column(name = "new_status", nullable = false, length = 20)
    private String newStatus;

    @NotNull(message = "La fecha del cambio es obligatoria")
    @Column(name = "changed_at", nullable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime changedAt;

    @Lob
    @Size(max = 500, message = "La razón del cambio no puede exceder 500 caracteres")
    @Column(name = "change_reason")
    private String changeReason;

    @PrePersist
    protected void onCreate() {
        if (changedAt == null) {
            changedAt = LocalDateTime.now();
        }
    }
}
