package com.imperial.hotel.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.OffsetDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeResponseDTO {
    private Long id;
    private String firstName;
    private String lastName;
    private String fullName;
    private String email;
    private String phone;
    private Boolean isActive;
    private OffsetDateTime createdAt;
    private RoleDTO role;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class RoleDTO {
        private Long Id;
        private String name;
        private String description;
    }
}