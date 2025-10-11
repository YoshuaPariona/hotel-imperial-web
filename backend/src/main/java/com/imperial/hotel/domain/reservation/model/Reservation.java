package com.imperial.hotel.domain.reservation.model;

import com.imperial.hotel.domain.room.model.Room;
import com.imperial.hotel.domain.user.model.User;
import com.imperial.hotel.domain.guest.model.Guest;
import jakarta.persistence.*;
import lombok.*;
import java.time.OffsetDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "reservations")
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "reservation_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id", nullable = false)
    private Room room;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "guest_id")
    private Guest guest;

    @Column(name = "check_in", nullable = false)
    private OffsetDateTime checkIn;

    @Column(name = "check_out", nullable = false)
    private OffsetDateTime checkOut;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private ReservationStatus status = ReservationStatus.CONFIRMADO;

    @Column(name = "created_at", nullable = false, updatable = false)
    private OffsetDateTime createdAt = OffsetDateTime.now();

    public enum ReservationStatus {
        CONFIRMADO, CANCELADO, COMPLETADO
    }
}
