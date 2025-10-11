package com.imperial.hotel.domain.room.model;

import jakarta.persistence.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
@Entity
@Table(name = "rooms")
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long roomId;

    @Column(nullable = false, unique = true, length = 10)
    private String roomNumber;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "room_type_id", nullable = false,
            foreignKey = @ForeignKey(name = "fk_rooms_room_types"))
    private RoomType roomType;

    private Integer floor;
    private Integer capacity;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private RoomStatus currentStatus = RoomStatus.DISPONIBLE;

    @Column(columnDefinition = "TEXT")
    private String note;

}
