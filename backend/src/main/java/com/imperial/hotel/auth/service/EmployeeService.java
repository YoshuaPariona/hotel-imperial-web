package com.imperial.hotel.auth.service;

import com.imperial.hotel.auth.dto.EmployeeResponseDTO;
import com.imperial.hotel.auth.dto.EmployeeRequestDTO;
import com.imperial.hotel.auth.mapper.EmployeeMapper;
import com.imperial.hotel.auth.model.Employee;
import com.imperial.hotel.auth.model.Role;
import com.imperial.hotel.auth.repository.EmployeeRepository;
import com.imperial.hotel.auth.repository.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final RoleRepository roleRepository;
    private final EmployeeMapper mapper;

    @Transactional(readOnly = true)
    public List<EmployeeResponseDTO> findAll() {
        return employeeRepository.findAll()
                .stream()
                .map(mapper::toDTO)
                .toList();
    }

    @Transactional
    public EmployeeResponseDTO create(EmployeeRequestDTO dto) {
        Employee employee = mapper.toEntity(dto);

        // Buscar rol por nombre
        Role role = roleRepository.findByName(dto.getRoleName())
                .orElseThrow(() -> new RuntimeException("Rol no encontrado: " + dto.getRoleName()));

        employee.setRole(role);

        // Simulamos el hash de contraseña (en real, usar BCrypt)
        employee.setHashedPassword("{noop}" + dto.getRawPassword());

        Employee saved = employeeRepository.save(employee);
        return mapper.toDTO(saved);
    }
}
