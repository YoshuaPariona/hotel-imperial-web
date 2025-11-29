package com.imperial.hotel.auth.controller;

import com.imperial.hotel.auth.dto.EmployeeResponseDTO;
import com.imperial.hotel.auth.dto.EmployeeRequestDTO;
import com.imperial.hotel.auth.service.EmployeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/employees")
@RequiredArgsConstructor
public class EmployeeController {

    private final EmployeeService employeeService;

    @GetMapping
    public ResponseEntity<List<EmployeeResponseDTO>> getAll() {
        return ResponseEntity.ok(employeeService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<EmployeeResponseDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(employeeService.findById(id));
    }

    @PostMapping
    public ResponseEntity<EmployeeResponseDTO> create(@RequestBody EmployeeRequestDTO dto) {
        return ResponseEntity.ok(employeeService.create(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<EmployeeResponseDTO> update(@PathVariable Long id, @RequestBody EmployeeRequestDTO dto) {
        return ResponseEntity.ok(employeeService.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        employeeService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
