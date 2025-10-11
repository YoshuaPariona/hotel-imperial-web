package com.imperial.hotel.infrastructure.web.mapper;

import com.imperial.hotel.application.guest.dto.GuestResponseDTO;
import com.imperial.hotel.application.guest.dto.GuestRequestDTO;
import com.imperial.hotel.domain.guest.model.Guest;
import org.springframework.stereotype.Component;

@Component
public class GuestMapper {

    public GuestResponseDTO toResponseDTO(Guest guest) {
        if (guest == null) return null;

        return GuestResponseDTO.builder()
                .id(guest.getGuestId())
                .firstName(guest.getFirstName())
                .lastName(guest.getLastName())
                .docType(guest.getDocType())
                .documentNumber(guest.getDocumentNumber())
                .phone(guest.getPhone())
                .email(guest.getEmail())
                .build();
    }

    public Guest toEntity(GuestRequestDTO dto) {
        if (dto == null) return null;

        return Guest.builder()
                .firstName(dto.getFirstName())
                .lastName(dto.getLastName())
                .docType(dto.getDocType() != null ? dto.getDocType() : "DNI")
                .documentNumber(dto.getDocumentNumber())
                .phone(dto.getPhone())
                .email(dto.getEmail())
                .build();
    }
}
