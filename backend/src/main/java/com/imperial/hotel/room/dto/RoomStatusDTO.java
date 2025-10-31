package com.imperial.hotel.room.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RoomStatusDTO implements Serializable {
    private Long roomId;
    private Long employeeId;
    private String newStatus;
}