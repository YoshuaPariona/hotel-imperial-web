package com.imperial.hotel.auth.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "role")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "role_id")
    private Long id;

    @NotBlank(message = "El nombre del rol es obligatorio")
    @Size(max = 100, message = "El nombre del rol no puede exceder 100 caracteres")
    @Column(name = "name", nullable = false, unique = true, length = 100)
    private String name;

    @Lob
    @Size(max = 500, message = "La descripción no puede exceder 500 caracteres")
    @Column(name = "description")
    private String description;
}
