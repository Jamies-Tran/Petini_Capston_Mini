package com.capstone.mini.petini.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.capstone.mini.petini.model.Cart;

public interface CartRepo extends JpaRepository<Cart, Long> {
    @Query(value = "select c from Cart c where c.customer.user.username = :username and c.status = 'SAVED'")
    Optional<Cart> findUserSavedCart(@Param("username") String username);
}
