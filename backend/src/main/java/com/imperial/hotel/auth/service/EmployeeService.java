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
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final RoleRepository roleRepository;
    private final EmployeeMapper employeeMapper;

    @Transactional(readOnly = true)
    public List<EmployeeResponseDTO> findAll() {
        return employeeRepository.findAll()
                .stream()
                .map(employeeMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public EmployeeResponseDTO findById(Long id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Empleado no encontrado con ID: " + id));
        return employeeMapper.toDTO(employee);
    }

    @Transactional
    public EmployeeResponseDTO create(EmployeeRequestDTO dto) {
        Employee employee = employeeMapper.toEntity(dto);

        // Buscar rol por nombre
        Role role = roleRepository.findByName(dto.getRoleName())
                .orElseThrow(() -> new RuntimeException("Rol no encontrado: " + dto.getRoleName()));

        employee.setRole(role);

        // Simulamos el hash de contraseña (en real, usar BCrypt)
        employee.setHashedPassword("{noop}" + dto.getRawPassword());

        Employee saved = employeeRepository.save(employee);
        return employeeMapper.toDTO(saved);
    }

    @Transactional
    public EmployeeResponseDTO update(Long id, EmployeeRequestDTO dto) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Empleado no encontrado con ID: " + id));

        employee.setFirstName(dto.getFirstName());
        employee.setLastName(dto.getLastName());
        employee.setEmail(dto.getEmail());
        employee.setPhone(dto.getPhone());

        if (dto.getRoleName() != null) {
            Role role = roleRepository.findByName(dto.getRoleName())
                    .orElseThrow(() -> new RuntimeException("Rol no encontrado: " + dto.getRoleName()));
            employee.setRole(role);
        }

        if (dto.getRawPassword() != null && !dto.getRawPassword().isEmpty()) {
            employee.setHashedPassword("{noop}" + dto.getRawPassword());
        }

        Employee updated = employeeRepository.save(employee);
        return employeeMapper.toDTO(updated);
    }

    @Transactional
    public void delete(Long id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Empleado no encontrado con ID: " + id));
        employee.setIsActive(false);
        employeeRepository.save(employee);
    }
}
