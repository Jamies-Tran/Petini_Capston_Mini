package com.capstone.mini.petini.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.capstone.mini.petini.model.Order;

public interface OrderRepo extends JpaRepository<Order, Long> {

}
