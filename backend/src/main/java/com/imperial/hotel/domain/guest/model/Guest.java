package com.imperial.hotel.domain.guest.model;

import jakarta.persistence.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "guests")
public class Guest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long guestId;

    @Column(nullable = false, length = 150)
    private String firstName;

    @Column(nullable = false, length = 150)
    private String lastName;

    @Column(length = 20)
    private String docType = "DNI"; // valor por defecto

    @Column(length = 50, unique = true)
    private String documentNumber;

    @Column(length = 30)
    private String phone;

    @Column(length = 150, unique = true)
    private String email;

    // Métodos convenientes si quieres manejar docType como enum en la API
    public enum DocumentType {
        DNI, PASAPORTE
    }

    public DocumentType getDocTypeEnum() {
        return DocumentType.valueOf(this.docType);
    }

    public void setDocTypeEnum(DocumentType docType) {
        this.docType = docType.name();
    }
}
