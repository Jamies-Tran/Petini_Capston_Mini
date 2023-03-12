package com.capstone.mini.petini.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.capstone.mini.petini.model.Order;

public interface OrderRepo extends JpaRepository<Order, Long> {
    @Query(value = "select o from Order o where o.cart.customer.user.username = :username")
    List<Order> findAllOrderOfCustomer(@Param("username") String username);

    @Query(value = "select o from Order o where o.status = :status")
    List<Order> findOrdersByStatus(@Param("status") String status);
}
