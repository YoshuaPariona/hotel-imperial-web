package com.imperial.hotel.occupancy.mapper;

import com.imperial.hotel.occupancy.dto.OccupancyListDTO;
import com.imperial.hotel.occupancy.model.Occupancy;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;


@Mapper(
        componentModel = "spring"
)
public interface OccupancyMapper {
    @Mapping(target = "roomNumber", source = "room.number")
    @Mapping(target = "guestName", expression = "java(occupancy.getGuest().getFirstName() + \" \" + occupancy.getGuest().getLastName())")
    OccupancyListDTO ToListDTO(Occupancy occupancy);
}
