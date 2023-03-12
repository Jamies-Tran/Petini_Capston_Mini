package com.capstone.mini.petini.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.capstone.mini.petini.model.AfterCareWorkingSchedule;

public interface AfterCareWorkingScheduleRepo extends JpaRepository<AfterCareWorkingSchedule, Long> {
    @Query(value = "select s from AfterCareWorkingSchedule s where s.timeLabel = :timeLabel")
    Optional<AfterCareWorkingSchedule> findWorkingScheduleByTimeLabel(@Param("timeLabel") String timeLabel);
}
