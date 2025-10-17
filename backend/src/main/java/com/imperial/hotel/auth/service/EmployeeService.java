package com.imperial.hotel.auth.service;

import com.imperial.hotel.auth.dto.EmployeeDTO;
import com.imperial.hotel.auth.model.Employee;
import com.imperial.hotel.auth.repository.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EmployeeService {

    private final EmployeeRepository employeeRepository;

    @Transactional(readOnly = true)
    public List<EmployeeDTO> getAllEmployees() {
        return employeeRepository.findAllWithRoles()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public EmployeeDTO getEmployeeById(Long employeeId) {
        Employee employee = employeeRepository.findByIdWithRole(employeeId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        return convertToDTO(employee);
    }

    @Transactional(readOnly = true)
    public List<EmployeeDTO> getActiveEmployees() {
        return employeeRepository.findByIsActive(true)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private EmployeeDTO convertToDTO(Employee employee) {
        EmployeeDTO dto = new EmployeeDTO();
        dto.setEmployeeId(employee.getEmployeeId());
        dto.setFirstName(employee.getFirstName());
        dto.setLastName(employee.getLastName());
        dto.setEmail(employee.getEmail());
        dto.setPhone(employee.getPhone());
        dto.setIsActive(employee.getIsActive());
        dto.setCreatedAt(employee.getCreatedAt());

        if (employee.getRole() != null) {
            EmployeeDTO.RoleDTO roleDTO = new EmployeeDTO.RoleDTO();
            roleDTO.setRoleId(employee.getRole().getRoleId());
            roleDTO.setName(employee.getRole().getName());
            roleDTO.setDescription(employee.getRole().getDescription());
            dto.setRole(roleDTO);
        }

        return dto;
    }
}