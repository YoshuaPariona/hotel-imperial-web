package com.imperial.hotel.room.mapper;

import com.imperial.hotel.room.dto.RoomListDTO;
import com.imperial.hotel.room.model.Room;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface RoomMapper {
    @Mapping(source = "roomType.category", target = "roomTypeCategory")
    RoomListDTO toListDTO(Room room);
}
