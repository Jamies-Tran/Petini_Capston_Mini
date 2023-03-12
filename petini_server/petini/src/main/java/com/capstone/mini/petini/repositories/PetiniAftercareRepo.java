package com.capstone.mini.petini.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.capstone.mini.petini.model.PetiniAfterCare;

public interface PetiniAftercareRepo extends JpaRepository<PetiniAfterCare, Long> {
    @Query(value = "select s from PetiniAfterCare s where s.name = :name")
    Optional<PetiniAfterCare> findPetiniAfterCareByName(@Param("name") String name);

    @Query(value = "select s from PetiniAfterCare s where s.status = 'ACTIVE'")
    List<PetiniAfterCare> getAllAvailablePetiniAfterCare();
}
