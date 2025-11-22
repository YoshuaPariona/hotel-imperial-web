package com.imperial.hotel.booking.service;

import com.imperial.hotel.auth.model.Employee;
import com.imperial.hotel.booking.dto.*;
import com.imperial.hotel.booking.mapper.ReservationMapper;
import com.imperial.hotel.booking.model.Guest;
import com.imperial.hotel.booking.model.Occupancy;
import com.imperial.hotel.booking.model.Reservation;
import com.imperial.hotel.booking.repository.GuestRepository;
import com.imperial.hotel.booking.repository.OccupancyRepository;
import com.imperial.hotel.booking.repository.ReservationRepository;
import com.imperial.hotel.room.model.Room;
import com.imperial.hotel.room.repository.RoomRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReservationService {
    private final ReservationRepository reservationRepository;
    private final GuestRepository guestRepository;
    private final OccupancyRepository occupancyRepository;
    private final RoomRepository roomRepository;
    private final ReservationMapper reservationMapper;

    @Transactional(readOnly = true)
    public List<ReservationListDTO> findAll() {
        return reservationRepository.findAll().stream()
                .map(this::mapToListDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public ReservationDetailDTO findById(Long id) {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Reserva no encontrada"));
        return mapToDetailDTO(reservation);
    }

    @Transactional
    public ReservationDetailDTO create(CreateReservationDTO dto) {
        // Validate guest exists
        Guest guest = guestRepository.findById(dto.getGuestId())
                .orElseThrow(() -> new EntityNotFoundException("Huésped no encontrado"));

        // Create reservation
        Reservation reservation = new Reservation();
        reservation.setCode(generateReservationCode());
        reservation.setGuest(guest);

        // Set employee reference
        Employee employee = new Employee();
        employee.setId(dto.getEmployeeId());
        reservation.setEmployee(employee);

        reservation.setCheckinDateExpected(dto.getCheckinDateExpected());
        reservation.setCheckoutDateExpected(dto.getCheckoutDateExpected());
        reservation.setStatus(dto.getStatus() != null ? dto.getStatus() : "pending");

        reservation = reservationRepository.save(reservation);

        // Create occupancy if room is assigned
        if (dto.getRoomId() != null) {
            createOccupancy(reservation, dto.getRoomId());
        }

        return mapToDetailDTO(reservation);
    }

    @Transactional
    public ReservationDetailDTO update(Long id, UpdateReservationDTO dto) {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Reserva no encontrada"));

        // Update guest if provided
        if (dto.getGuestId() != null) {
            Guest guest = guestRepository.findById(dto.getGuestId())
                    .orElseThrow(() -> new EntityNotFoundException("Huésped no encontrado"));
            reservation.setGuest(guest);
        }

        // Update dates if provided
        if (dto.getCheckinDateExpected() != null) {
            reservation.setCheckinDateExpected(dto.getCheckinDateExpected());
        }
        if (dto.getCheckoutDateExpected() != null) {
            reservation.setCheckoutDateExpected(dto.getCheckoutDateExpected());
        }

        // Update status if provided
        if (dto.getStatus() != null) {
            reservation.setStatus(dto.getStatus());
        }

        // Update room assignment if provided
        if (dto.getRoomId() != null) {
            updateRoomAssignment(reservation, dto.getRoomId());
        }

        reservation = reservationRepository.save(reservation);
        return mapToDetailDTO(reservation);
    }

    @Transactional
    public ReservationDetailDTO cancel(Long id, CancelReservationDTO dto) {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Reserva no encontrada"));

        reservation.setStatus("cancelled");
        reservation.setCancelReason(dto.getCancelReason());

        // Cancel active occupancies
        List<Occupancy> occupancies = occupancyRepository.findByReservationId(id);
        occupancies.forEach(occupancy -> {
            if ("active".equals(occupancy.getStatus())) {
                occupancy.setStatus("cancelled");
                occupancyRepository.save(occupancy);
            }
        });

        reservation = reservationRepository.save(reservation);
        return mapToDetailDTO(reservation);
    }

    @Transactional
    public ReservationDetailDTO updateStatus(Long id, String status) {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Reserva no encontrada"));

        reservation.setStatus(status);
        reservation = reservationRepository.save(reservation);
        return mapToDetailDTO(reservation);
    }

    // Helper methods
    private String generateReservationCode() {
        String prefix = "RES";
        String datePart = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        String randomPart = String.format("%04d", new Random().nextInt(10000));
        String code = prefix + "-" + datePart + "-" + randomPart;

        // Ensure uniqueness
        while (reservationRepository.existsByCode(code)) {
            randomPart = String.format("%04d", new Random().nextInt(10000));
            code = prefix + "-" + datePart + "-" + randomPart;
        }

        return code;
    }

    private void createOccupancy(Reservation reservation, Long roomId) {
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new EntityNotFoundException("Habitación no encontrada"));

        // Check for conflicts
        LocalDateTime checkinDatetime = reservation.getCheckinDateExpected().atTime(14, 0);
        LocalDateTime checkoutDatetime = reservation.getCheckoutDateExpected().atTime(12, 0);

        List<Occupancy> conflicts = occupancyRepository.findConflictingOccupancies(
                roomId, checkinDatetime, checkoutDatetime);

        if (!conflicts.isEmpty()) {
            throw new IllegalStateException("La habitación no está disponible para las fechas seleccionadas");
        }

        // Create occupancy
        Occupancy occupancy = new Occupancy();
        occupancy.setReservation(reservation);
        occupancy.setGuest(reservation.getGuest());
        occupancy.setRoom(room);
        occupancy.setCheckinDatetime(checkinDatetime);
        occupancy.setCheckoutDatetime(checkoutDatetime);
        occupancy.setNumberOfNights((short) ChronoUnit.DAYS.between(
                reservation.getCheckinDateExpected(),
                reservation.getCheckoutDateExpected()));
        occupancy.setStatus("active");

        occupancyRepository.save(occupancy);
    }

    private void updateRoomAssignment(Reservation reservation, Long newRoomId) {
        // Cancel existing active occupancy
        List<Occupancy> existingOccupancies = occupancyRepository.findByReservationId(reservation.getId());
        existingOccupancies.forEach(occupancy -> {
            if ("active".equals(occupancy.getStatus())) {
                occupancy.setStatus("cancelled");
                occupancyRepository.save(occupancy);
            }
        });

        // Create new occupancy
        createOccupancy(reservation, newRoomId);
    }

    private ReservationListDTO mapToListDTO(Reservation reservation) {
        ReservationListDTO dto = reservationMapper.toListDTO(reservation);

        // Add room information from occupancy
        List<Occupancy> occupancies = occupancyRepository.findByReservationId(reservation.getId());
        occupancies.stream()
                .filter(o -> "active".equals(o.getStatus()))
                .findFirst()
                .ifPresent(occupancy -> {
                    dto.setRoomId(occupancy.getRoom().getId());
                    dto.setRoomNumber(occupancy.getRoom().getRoomNumber());
                });

        return dto;
    }

    private ReservationDetailDTO mapToDetailDTO(Reservation reservation) {
        ReservationDetailDTO dto = reservationMapper.toDetailDTO(reservation);

        // Add room information from occupancy
        List<Occupancy> occupancies = occupancyRepository.findByReservationId(reservation.getId());
        occupancies.stream()
                .filter(o -> "active".equals(o.getStatus()))
                .findFirst()
                .ifPresent(occupancy -> {
                    dto.setRoomId(occupancy.getRoom().getId());
                    dto.setRoomNumber(occupancy.getRoom().getRoomNumber());
                });

        return dto;
    }
}
