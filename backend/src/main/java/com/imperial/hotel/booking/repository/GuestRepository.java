package com.imperial.hotel.booking.repository;

import com.imperial.hotel.booking.model.Guest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GuestRepository extends JpaRepository<Guest, Long> {
    Optional<Guest> findByDocumentNumber(String documentNumber);

    @Query("SELECT g FROM Guest g WHERE " +
            "LOWER(g.firstName) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
            "LOWER(g.lastName) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
            "LOWER(g.documentNumber) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
            "LOWER(g.email) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<Guest> searchGuests(@Param("query") String query);
}
