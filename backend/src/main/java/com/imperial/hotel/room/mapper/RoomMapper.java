package com.imperial.hotel.room.mapper;

import com.imperial.hotel.room.dto.RoomResponseDTO;
import com.imperial.hotel.room.model.Room;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface RoomMapper {

    @Mapping(source = "roomType", target = "roomType")
    @Mapping(source = "statusHistory", target = "statusHistory")
    RoomResponseDTO toDTO(Room room);
}
