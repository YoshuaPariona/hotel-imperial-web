package com.imperial.hotel.room.mapper;

import com.imperial.hotel.auth.model.Employee;
import com.imperial.hotel.room.dto.RoomListDTO;
import com.imperial.hotel.room.dto.RoomStatusDTO;
import com.imperial.hotel.room.model.Room;
import com.imperial.hotel.room.model.RoomStatusHistory;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.time.OffsetDateTime;

@Mapper(
        componentModel = "spring",
        imports = OffsetDateTime.class
)
public interface RoomMapper {
    @Mapping(source = "roomType.category", target = "roomTypeCategory")
    RoomListDTO toListDTO(Room room);


    @Mapping(target = "id", ignore = true)
    @Mapping(target = "room", source = "roomId", qualifiedByName = "mapRoomFromId")
    @Mapping(target = "changedBy", source = "employeeId", qualifiedByName = "mapEmployeeFromId")
    @Mapping(target = "previousStatus", ignore = true)
    @Mapping(target = "newStatus", source = "newStatus")
    @Mapping(target = "changedAt", expression = "java(OffsetDateTime.now())")
    @Mapping(target = "note", ignore = true)
    RoomStatusHistory toStatusEntity(RoomStatusDTO dto);

    @Named("mapRoomFromId")
    default Room mapRoomFromId(Long id) {
        if (id == null) return null;
        Room room = new Room();
        room.setId(id);
        return room;
    }

    @Named("mapEmployeeFromId")
    default Employee mapEmployeeFromId(Long id) {
        if (id == null) return null;
        Employee employee = new Employee();
        employee.setId(id);
        return employee;
    }

}
