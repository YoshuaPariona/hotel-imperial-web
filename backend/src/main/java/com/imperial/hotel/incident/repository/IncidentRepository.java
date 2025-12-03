package com.imperial.hotel.incident.repository;

import com.imperial.hotel.incident.model.Incident;
import com.imperial.hotel.incident.model.IncidentTypeCount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IncidentRepository extends JpaRepository<Incident, Long> {

    @Query("SELECT new com.imperial.hotel.incident.model.IncidentTypeCount(i.type, COUNT(i)) " +
            "FROM Incident i GROUP BY i.type")
    List<IncidentTypeCount> countIncidentsByType();
}
