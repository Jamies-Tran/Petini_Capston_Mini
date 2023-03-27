package com.capstone.mini.petini.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.capstone.mini.petini.model.Dashboard;

public interface DashBoardRepo extends JpaRepository<Dashboard, Long> {
    @Query(value = "select d from Dashboard d")
    Optional<Dashboard> findExistingDashBoard();
}
