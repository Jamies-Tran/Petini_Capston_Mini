package com.capstone.mini.petini.service;

import java.util.List;

import com.capstone.mini.petini.model.Order;

public interface IOrderService {
    Order createOrder();

    Order getOrderById(Long id);

    Order acceptOrder(Long id);

    Order rejectOrder(Long id);

    List<Order> getOrderByCustomer(String username);

    List<Order> getOrderByStatus(String status);

    List<Order> getAllOrder();
}
