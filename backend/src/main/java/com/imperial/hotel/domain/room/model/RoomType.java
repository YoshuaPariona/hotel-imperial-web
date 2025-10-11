package com.imperial.hotel.domain.room.model;

import jakarta.persistence.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "room_types")
public class RoomType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long roomTypeId;

    @Column(nullable = false, length = 20)
    private String category; // Lo guardamos como String, pero usamos enum en setters/getters

    @Column(length = 20)
    private String bedSize; // Lo guardamos como String, pero usamos enum en setters/getters

    private Integer bedQuantity;

    @Column(columnDefinition = "TEXT")
    private String description;

    // Métodos convenientes para usar enums
    public RoomCategory getCategoryEnum() {
        return RoomCategory.valueOf(this.category);
    }

    public void setCategoryEnum(RoomCategory category) {
        this.category = category.name();
    }

    public BedSize getBedSizeEnum() {
        return BedSize.valueOf(this.bedSize);
    }

    public void setBedSizeEnum(BedSize bedSize) {
        this.bedSize = bedSize.name();
    }
}
