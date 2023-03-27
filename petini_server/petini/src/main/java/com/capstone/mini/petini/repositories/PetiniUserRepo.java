package com.capstone.mini.petini.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.capstone.mini.petini.model.PetiniUser;

public interface PetiniUserRepo extends JpaRepository<PetiniUser, Long> {
    @Query(value = "select u from PetiniUser u where u.username = :username")
    Optional<PetiniUser> findUserByUsername(@Param("username") String username);

    @Query(value = "select count(u) from PetiniUser u where u.customerProperty != null")
    Long getNumberOfCustomer();
}
