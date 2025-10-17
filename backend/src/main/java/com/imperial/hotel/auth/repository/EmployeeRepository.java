package com.imperial.hotel.auth.repository;


import com.imperial.hotel.auth.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    Optional<Employee> findByEmail(String email);

    List<Employee> findByIsActive(Boolean isActive);

    @Query("SELECT e FROM Employee e JOIN FETCH e.role WHERE e.employeeId = :hotelEmployeeId")
    Optional<Employee> findByIdWithRole(Long hotelEmployeeId);

    @Query("SELECT e FROM Employee e JOIN FETCH e.role")
    List<Employee> findAllWithRoles();
}