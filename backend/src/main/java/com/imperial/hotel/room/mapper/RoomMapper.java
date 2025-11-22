package com.imperial.hotel.room.mapper;

import com.imperial.hotel.auth.model.Employee;
import com.imperial.hotel.room.dto.RoomListDTO;
import com.imperial.hotel.room.dto.RoomStatusDTO;
import com.imperial.hotel.room.model.Room;
import com.imperial.hotel.room.model.RoomStatusHistory;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.time.LocalDateTime;

@Mapper(componentModel = "spring", imports = LocalDateTime.class)
public interface RoomMapper {
    @Mapping(source = "roomNumber", target = "number")
    @Mapping(source = "roomType.category", target = "roomTypeCategory")
    @Mapping(source = "roomType.bedSize", target = "roomTypeBedSize")
    @Mapping(source = "roomType.bedQuantity", target = "roomTypeBedQuantity")
    RoomListDTO toListDTO(Room room);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "room", ignore = true)
    @Mapping(target = "changedBy", source = "employeeId", qualifiedByName = "mapEmployeeFromId")
    @Mapping(target = "previousStatus", ignore = true)
    @Mapping(target = "changedAt", expression = "java(LocalDateTime.now())")

    RoomStatusHistory toStatusEntity(RoomStatusDTO dto);

    @Named("mapEmployeeFromId")
    default Employee mapEmployeeFromId(Long id) {
        if (id == null)
            return null;
        Employee employee = new Employee();
        employee.setId(id);
        return employee;
    }

}
