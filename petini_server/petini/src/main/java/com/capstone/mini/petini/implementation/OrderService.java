package com.capstone.mini.petini.implementation;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.capstone.mini.petini.handlers.exceptions.InvalidException;
import com.capstone.mini.petini.handlers.exceptions.NotFoundException;
import com.capstone.mini.petini.model.Cart;
import com.capstone.mini.petini.model.CartProduct;
import com.capstone.mini.petini.model.Order;
import com.capstone.mini.petini.model.PetiniUser;
import com.capstone.mini.petini.model.status.CartStatus;
import com.capstone.mini.petini.model.status.OrderStatus;
import com.capstone.mini.petini.repositories.CartRepo;
import com.capstone.mini.petini.repositories.OrderRepo;
import com.capstone.mini.petini.service.IOrderService;
import com.capstone.mini.petini.service.IUserService;
import com.capstone.mini.petini.util.DateFormatUtil;

@Service
public class OrderService implements IOrderService {
    @Autowired
    private IUserService userService;

    @Autowired
    private OrderRepo orderRepo;

    @Autowired
    private DateFormatUtil dateFormatUtil;

    @Autowired
    private CartRepo cartRepo;

    @Override
    @Transactional
    public Order createOrder() {
        PetiniUser user = userService.getAuthenticatedUser();
        Cart userCart = cartRepo.findUserSavedCart(user.getUsername())
                .orElseThrow(() -> new InvalidException("Add to cart first"));
        for (CartProduct c : userCart.getCartProduct()) {
            c.getProduct().setQuantity(c.getProduct().getQuantity() - c.getQuantity());
        }
        Order order = new Order();
        order.setCreatedBy(user.getUsername());
        order.setCreatedDate(dateFormatUtil.formatDateTimeNowToString());
        order.setCart(userCart);
        order.setStatus(OrderStatus.PENDING.name());
        userCart.setStatus(CartStatus.SUBMITED.name());
        Order savedOrder = orderRepo.save(order);
        return savedOrder;
    }

    @Override
    public Order getOrderById(Long id) {
        Order order = orderRepo.findById(id).orElseThrow(() -> new NotFoundException("Can't find order"));

        return order;
    }

    @Override
    public List<Order> getOrderByCustomer(String username) {
        List<Order> orders = orderRepo.findAllOrderOfCustomer(username);

        return orders;
    }

    @Override
    public List<Order> getOrderByStatus(String status) {
        List<Order> orders = orderRepo.findOrdersByStatus(status);

        return orders;
    }

    @Override
    public List<Order> getAllOrder() {
        List<Order> orders = orderRepo.findAll();

        return orders;
    }

    @Override
    @Transactional
    public Order acceptOrder(Long id) {
        PetiniUser user = userService.getAuthenticatedUser();
        Order order = orderRepo.findById(id).orElseThrow(() -> new NotFoundException("Can't find order"));

        order.setStatus(OrderStatus.ACCEPT.name());
        order.setUpdatedBy(user.getUsername());
        order.setUpdatedDate(dateFormatUtil.formatDateTimeNowToString());

        return order;
    }

    @Override
    @Transactional
    public Order rejectOrder(Long id) {
        PetiniUser user = userService.getAuthenticatedUser();
        Order order = orderRepo.findById(id).orElseThrow(() -> new NotFoundException("Can't find order"));
        order.setStatus(OrderStatus.REJECT.name());
        order.setStatus(OrderStatus.ACCEPT.name());
        order.setUpdatedBy(user.getUsername());
        order.setUpdatedDate(dateFormatUtil.formatDateTimeNowToString());

        return order;
    }

}
