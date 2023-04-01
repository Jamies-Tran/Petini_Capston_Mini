package com.capstone.mini.petini.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.capstone.mini.petini.model.Pet;

public interface PetRepo extends JpaRepository<Pet, Long> {

    @Query(value = "select p from Pet p where p.name = :name")
    Optional<Pet> findPetByName(@Param("name") String name);

    @Query(value = "select p from Pet p where p.petType = :type")
    List<Pet> findPetListByType(@Param("type") String type);

    @Query(value = "select p from Pet p where p.age between :ageFrom and :ageTo")
    List<Pet> findPetListByAgeRange(@Param("ageFrom") int ageFrom, @Param("ageTo") int ageTo);

    @Query(value = "select p from Pet p where p.color = :color")
    List<Pet> findPetListByColor(@Param("color") String color);

    @Query(value = "select p from Pet p where p.status = 'NOT_ADOPTED'")
    List<Pet> findAllAvailablePetForAdopted();

    @Query(value = "select p from Pet p where p.status = :status")
    List<Pet> findPetListByStatus(@Param("status") String status);
}
