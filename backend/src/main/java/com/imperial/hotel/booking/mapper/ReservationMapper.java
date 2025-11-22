package com.imperial.hotel.booking.mapper;

import com.imperial.hotel.auth.model.Employee;
import com.imperial.hotel.booking.dto.*;
import com.imperial.hotel.booking.model.Guest;
import com.imperial.hotel.booking.model.Reservation;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

@Mapper(componentModel = "spring")
public interface ReservationMapper {

    // Guest mappings
    GuestDTO toGuestDTO(Guest guest);

    // Employee mappings
    @Mapping(source = "firstName", target = "firstName")
    @Mapping(source = "lastName", target = "lastName")
    EmployeeDTO toEmployeeDTO(Employee employee);

    // Reservation mappings
    @Mapping(source = "guest", target = "guest")
    @Mapping(source = "employee", target = "employee")
    @Mapping(target = "roomNumber", ignore = true)
    @Mapping(target = "roomId", ignore = true)
    ReservationListDTO toListDTO(Reservation reservation);

    @Mapping(source = "guest", target = "guest")
    @Mapping(source = "employee", target = "employee")
    @Mapping(target = "roomNumber", ignore = true)
    @Mapping(target = "roomId", ignore = true)
    ReservationDetailDTO toDetailDTO(Reservation reservation);

    // Helper methods for entity references
    @Named("mapGuestFromId")
    default Guest mapGuestFromId(Long id) {
        if (id == null)
            return null;
        Guest guest = new Guest();
        guest.setId(id);
        return guest;
    }

    @Named("mapEmployeeFromId")
    default Employee mapEmployeeFromId(Long id) {
        if (id == null)
            return null;
        Employee employee = new Employee();
        employee.setId(id);
        return employee;
    }
}
