package com.imperial.hotel.auth.mapper;

import com.imperial.hotel.auth.dto.EmployeeResponseDTO;
import com.imperial.hotel.auth.dto.EmployeeRequestDTO;
import com.imperial.hotel.auth.model.Employee;
import com.imperial.hotel.auth.model.Role;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface EmployeeMapper {

    @Mapping(target = "fullName", expression = "java(employee.getFirstName() + \" \" + employee.getLastName())")
    EmployeeResponseDTO toDTO(Employee employee);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "hashedPassword", ignore = true)
    @Mapping(target = "isActive", constant = "true")
    @Mapping(target = "createdAt", expression = "java(java.time.LocalDateTime.now())")
    @Mapping(target = "role", ignore = true)
    Employee toEntity(EmployeeRequestDTO dto);

    EmployeeResponseDTO.RoleDTO toRoleDTO(Role role);
}
