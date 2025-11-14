package com.imperial.hotel.room.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "room")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "room_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_type_id", nullable = false, foreignKey = @ForeignKey(name = "fk_room_room_type"))
    private RoomType roomType;

    @Column(name = "room_number", nullable = false, unique = true, length = 15)
    private String number;

    @Column(name = "floor")
    private Integer floor;

    @Column(name = "current_status", length = 20)
    private String currentStatus = "DISPONIBLE";

    @Column(name = "amenities", columnDefinition = "TEXT")
    private String amenities;

    @Column(name = "nightly_rate", nullable = false, precision = 10, scale = 2)
    private BigDecimal nightlyRate;

    @OneToMany(mappedBy = "room", cascade = CascadeType.ALL)
    private List<RoomStatusHistory> statusHistory = new ArrayList<>();
}
