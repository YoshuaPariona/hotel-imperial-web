package com.imperial.hotel.booking.model;

import com.imperial.hotel.auth.model.Employee;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "reservation")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "reservation_id")
    private Long id;

    @NotBlank(message = "El código de reserva es obligatorio")
    @Size(max = 30, message = "El código de reserva no puede exceder 30 caracteres")
    @Column(name = "code", nullable = false, unique = true, length = 30)
    private String code;

    @NotNull(message = "El huésped es obligatorio")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "guest_id", nullable = false, foreignKey = @ForeignKey(name = "fk_reservation_guest"))
    private Guest guest;

    @NotNull(message = "El empleado es obligatorio")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employee_id", nullable = false, foreignKey = @ForeignKey(name = "fk_reservation_employee"))
    private Employee employee;

    @NotNull(message = "La fecha de creación es obligatoria")
    @Column(name = "created_at", nullable = false, updatable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime createdAt;

    @NotNull(message = "La fecha de actualización es obligatoria")
    @Column(name = "updated_at", nullable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")
    private LocalDateTime updatedAt;

    @NotNull(message = "La fecha esperada de check-in es obligatoria")
    @Column(name = "checkin_date_expected", nullable = false)
    private LocalDate checkinDateExpected;

    @NotNull(message = "La fecha esperada de check-out es obligatoria")
    @Column(name = "checkout_date_expected", nullable = false)
    private LocalDate checkoutDateExpected;

    @NotBlank(message = "El estado es obligatorio")
    @Size(max = 20, message = "El estado no puede exceder 20 caracteres")
    @Column(name = "status", nullable = false, length = 20)
    private String status = "pending";

    @Lob
    @Size(max = 500, message = "La razón de cancelación no puede exceder 500 caracteres")
    @Column(name = "cancel_reason")
    private String cancelReason;

    @PrePersist
    protected void onCreate() {
        if (createdAt == null) {
            createdAt = LocalDateTime.now();
        }
        if (updatedAt == null) {
            updatedAt = LocalDateTime.now();
        }
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
