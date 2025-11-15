package com.imperial.hotel.room.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
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

    @NotNull(message = "El tipo de habitación es obligatorio")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_type_id", nullable = false, foreignKey = @ForeignKey(name = "fk_room_room_type"))
    private RoomType roomType;

    @NotBlank(message = "El número de habitación es obligatorio")
    @Size(max = 15, message = "El número de habitación no puede exceder 15 caracteres")
    @Column(name = "room_number", nullable = false, unique = true, length = 15)
    private String roomNumber;

    @Column(name = "floor")
    private Integer floor;

    @NotBlank(message = "El estado actual es obligatorio")
    @Size(max = 20, message = "El estado no puede exceder 20 caracteres")
    @Column(name = "current_status", length = 20)
    private String currentStatus = "DISPONIBLE";

    @Lob
    @NotBlank(message = "Las comodidades son obligatorias")
    @Column(name = "amenities", nullable = false)
    private String amenities;

    @NotNull(message = "La tarifa nocturna es obligatoria")
    @DecimalMin(value = "0.00", message = "La tarifa nocturna debe ser mayor o igual a 0")
    @Column(name = "nightly_rate", nullable = false, precision = 10, scale = 2)
    private BigDecimal nightlyRate;

    @OneToMany(mappedBy = "room", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<RoomStatusHistory> statusHistory = new ArrayList<>();
}
