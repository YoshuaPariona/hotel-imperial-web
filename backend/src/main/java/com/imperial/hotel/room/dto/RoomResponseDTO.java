package com.imperial.hotel.room.dto;

import com.imperial.hotel.auth.model.Employee;
import com.imperial.hotel.room.model.Room;
import com.imperial.hotel.room.model.RoomStatusHistory;
import com.imperial.hotel.room.model.RoomType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RoomResponseDTO {

    private Long id;
    private String roomNumber;
    private Integer floor;
    private Integer capacity;
    private String currentStatus = "DISPONIBLE";
    private String note;

    private RoomTypeDTO roomType;
    private List<RoomStatusHistoryDTO> statusHistory = new ArrayList<>();

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class RoomTypeDTO {
        private Long id;
        private String category;
        private String bedSize;
        private Integer bedQuantity;
        private String description;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public  static class RoomStatusHistoryDTO {
        private Long id;
        private String previousStatus;
        private String newStatus;
        private OffsetDateTime changedAt;
        private String note;

        private ChangedByDTO changedBy;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ChangedByDTO {
        private Long id;
        private String firstName;
        private String lastName;
        private String email;
    }
}
