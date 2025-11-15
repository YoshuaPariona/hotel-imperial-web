package com.imperial.hotel.booking.model;


import com.imperial.hotel.room.model.Room;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "occupancy")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Occupancy {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "occupancy_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reservation_id", foreignKey = @ForeignKey(name = "fk_occupancy_reservation"))
    private Reservation reservation;

    @NotNull(message = "El huésped es obligatorio")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "guest_id", nullable = false, foreignKey = @ForeignKey(name = "fk_occupancy_guest"))
    private Guest guest;

    @NotNull(message = "La habitación es obligatoria")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id", nullable = false, foreignKey = @ForeignKey(name = "fk_occupancy_room"))
    private Room room;

    @NotNull(message = "La fecha y hora de check-in es obligatoria")
    @Column(name = "checkin_datetime", nullable = false)
    private LocalDateTime checkinDatetime;

    @Column(name = "checkout_datetime")
    private LocalDateTime checkoutDatetime;

    @NotNull(message = "El número de noches es obligatorio")
    @Column(name = "number_of_nights", nullable = false)
    private Short numberOfNights;

    @NotBlank(message = "El estado es obligatorio")
    @Size(max = 20, message = "El estado no puede exceder 20 caracteres")
    @Column(name = "status", nullable = false, length = 20)
    private String status = "active";

    @NotNull(message = "La fecha de creación es obligatoria")
    @Column(name = "created_at", nullable = false, updatable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime createdAt;

    @NotNull(message = "La fecha de actualización es obligatoria")
    @Column(name = "updated_at", nullable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        if (createdAt == null) {
            createdAt = LocalDateTime.now();
        }
        if (updatedAt == null) {
            updatedAt = LocalDateTime.now();
        }
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
