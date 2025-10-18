package com.imperial.hotel.occupancy.model;

import com.imperial.hotel.booking.model.Guest;
import com.imperial.hotel.booking.model.Reservation;
import com.imperial.hotel.room.model.Room;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.OffsetDateTime;

@Entity
@Table(name = "occupancy")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Occupancy {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "occupancy_id")
    private Long occupancyId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id", nullable = false, foreignKey = @ForeignKey(name = "fk_occupancy_room"))
    private Room room;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "guest_id", nullable = false, foreignKey = @ForeignKey(name = "fk_occupancy_guest"))
    private Guest guest;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reservation_id", nullable = false, foreignKey = @ForeignKey(name = "fk_occupancy_reservation"))
    private Reservation reservation;

    @Column(name = "status", nullable = false, length = 20)
    private String status = "ACTIVA";

    @Column(name = "check_in_date", nullable = false, columnDefinition = "TIMESTAMP WITH TIME ZONE")
    private OffsetDateTime checkInDate;

    @Column(name = "check_out_date", nullable = false, columnDefinition = "TIMESTAMP WITH TIME ZONE")
    private OffsetDateTime checkOutDate;

    @Column(name = "created_at", nullable = false, columnDefinition = "TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP")
    private OffsetDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        if (createdAt == null) {
            createdAt = OffsetDateTime.now();
        }
    }
}
