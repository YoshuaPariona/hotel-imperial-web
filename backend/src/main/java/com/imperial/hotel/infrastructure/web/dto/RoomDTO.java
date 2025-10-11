package com.imperial.hotel.infrastructure.web.dto;

import com.imperial.hotel.domain.room.model.Room;
import com.imperial.hotel.domain.room.model.RoomStatus;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RoomDTO {
    private Long id;
    private String number;
    private Long roomTypeId;
    private RoomStatus status;
    private String note;
}
