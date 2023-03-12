package com.capstone.mini.petini.implementation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.capstone.mini.petini.handlers.exceptions.InvalidException;
import com.capstone.mini.petini.model.Cart;
import com.capstone.mini.petini.model.Order;
import com.capstone.mini.petini.model.PetiniUser;
import com.capstone.mini.petini.model.status.OrderStatus;
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

    @Override
    public Order createOrder() {
        PetiniUser user = userService.getAuthenticatedUser();
        Cart userCart = user.getCustomerProperty().getCart();
        if (userCart.getCartProduct().isEmpty()) {
            throw new InvalidException("Add to cart first");
        }
        Order order = new Order();
        order.setCreatedBy(user.getUsername());
        order.setCreatedDate(dateFormatUtil.formatDateTimeNowToString());
        order.setCart(userCart);
        order.setStatus(OrderStatus.PENDING.name());
        Order savedOrder = orderRepo.save(order);
        return savedOrder;
    }

}
