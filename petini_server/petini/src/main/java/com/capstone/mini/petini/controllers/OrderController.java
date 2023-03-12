package com.capstone.mini.petini.controllers;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.capstone.mini.petini.dto.response.OrderResponseDto;
import com.capstone.mini.petini.model.Order;
import com.capstone.mini.petini.service.IOrderService;

@RestController
@RequestMapping("/api/order")
public class OrderController {
    @Autowired
    private IOrderService orderService;

    @Autowired
    private ModelMapper modelMapper;

    @PostMapping("/new-order")
    @PreAuthorize("hasRole('ROLE_CUSTOMER')")
    public ResponseEntity<?> createOrder() {
        Order order = orderService.createOrder();
        OrderResponseDto responseOrder = modelMapper.map(order, OrderResponseDto.class);

        return new ResponseEntity<OrderResponseDto>(responseOrder, HttpStatus.OK);
    }

    @GetMapping("/customer-orders")
    @PreAuthorize("hasAnyRole('ROLE_CUSTOMER', 'ROLE_SHOPOWNER')")
    public ResponseEntity<?> getAllOrderOfCustomer(@RequestParam String username) {
        List<Order> orders = orderService.getOrderByCustomer(username);
        List<OrderResponseDto> responseOrderList = orders.stream().map(o -> modelMapper.map(o, OrderResponseDto.class))
                .collect(Collectors.toList());

        return new ResponseEntity<List<OrderResponseDto>>(responseOrderList, HttpStatus.OK);
    }

    @GetMapping("/status-orders")
    @PreAuthorize("hasAnyRole('ROLE_CUSTOMER', 'ROLE_SHOPOWNER')")
    public ResponseEntity<?> getOrderByStatus(@RequestParam String status) {
        List<Order> orders = orderService.getOrderByStatus(status);
        List<OrderResponseDto> responseOrderList = orders.stream().map(o -> modelMapper.map(o, OrderResponseDto.class))
                .collect(Collectors.toList());

        return new ResponseEntity<List<OrderResponseDto>>(responseOrderList, HttpStatus.OK);
    }

    @GetMapping("/all-orders")
    @PreAuthorize("hasRole('ROLE_SHOPOWNER')")
    public ResponseEntity<?> getAllOrders() {
        List<Order> orders = orderService.getAllOrder();
        List<OrderResponseDto> responseOrderList = orders.stream().map(o -> modelMapper.map(o, OrderResponseDto.class))
                .collect(Collectors.toList());

        return new ResponseEntity<List<OrderResponseDto>>(responseOrderList, HttpStatus.OK);
    }

    @PutMapping("/order-accepting")
    @PreAuthorize("hasRole('ROLE_SHOPOWNER')")
    public ResponseEntity<?> acceptOrder(@RequestParam Long id) {
        Order order = orderService.acceptOrder(id);
        OrderResponseDto responseOrder = modelMapper.map(order, OrderResponseDto.class);

        return new ResponseEntity<OrderResponseDto>(responseOrder, HttpStatus.OK);
    }

    @PutMapping("/order-rejecting")
    @PreAuthorize("hasRole('ROLE_SHOPOWNER')")
    public ResponseEntity<?> rejectOrder(@RequestParam Long id) {
        Order order = orderService.rejectOrder(id);
        OrderResponseDto responseOrder = modelMapper.map(order, OrderResponseDto.class);

        return new ResponseEntity<OrderResponseDto>(responseOrder, HttpStatus.OK);
    }
}
