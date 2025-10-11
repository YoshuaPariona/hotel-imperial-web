package com.imperial.hotel.domain.guest.model;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "guests")
public class Guest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "guest_id")
    private Long id;

    @Column(name = "first_name", nullable = false, length = 150)
    private String firstName;

    @Column(name = "last_name", nullable = false, length = 150)
    private String lastName;

    @Enumerated(EnumType.STRING)
    @Column(name = "doc_type", nullable = false)
    private DocumentType documentType = DocumentType.DNI;

    @Column(name = "document_number", unique = true, length = 50)
    private String documentNumber;

    @Column(name = "phone", length = 30)
    private String phone;

    @Column(name = "email", unique = true, length = 150)
    private String email;

    public enum DocumentType {
        DNI, PASAPORTE
    }
}
