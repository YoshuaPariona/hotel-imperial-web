package com.imperial.hotel.application.guest.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GuestRequestDTO {
    private String firstName;
    private String lastName;
    private String docType;
    private String documentNumber;
    private String phone;
    private String email;
}
