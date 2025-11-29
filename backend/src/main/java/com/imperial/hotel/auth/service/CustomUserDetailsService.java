package com.imperial.hotel.auth.service;

import com.imperial.hotel.auth.model.Employee;
import com.imperial.hotel.auth.repository.EmployeeRepository;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final EmployeeRepository employeeRepository;

    public CustomUserDetailsService(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    @Override
    @Transactional // Asegura que la sesión de Hibernate esté activa
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Employee employee = employeeRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado con email: " + email));

        // Accede al role dentro de la transacción
        String roleName = employee.getRole().getName();

        return User.builder()
                .username(employee.getEmail())
                .password(employee.getHashedPassword())
                .roles(roleName)
                .build();
    }
}
