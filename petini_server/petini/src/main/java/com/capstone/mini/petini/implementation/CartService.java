package com.capstone.mini.petini.implementation;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.capstone.mini.petini.repositories.CartProductRepo;
import com.capstone.mini.petini.repositories.CartRepo;
import com.capstone.mini.petini.handlers.exceptions.InvalidException;
import com.capstone.mini.petini.model.Cart;
import com.capstone.mini.petini.model.CartProduct;
import com.capstone.mini.petini.model.CartProductId;
import com.capstone.mini.petini.model.PetiniUser;
import com.capstone.mini.petini.model.Product;
import com.capstone.mini.petini.model.status.CartStatus;
import com.capstone.mini.petini.service.ICartService;
import com.capstone.mini.petini.service.IProductService;
import com.capstone.mini.petini.service.IUserService;
import com.capstone.mini.petini.util.DateFormatUtil;

@Service
public class CartService implements ICartService {
    @Autowired
    private IProductService productService;

    @Autowired
    private IUserService userService;

    @Autowired
    private CartProductRepo cartProductRepo;

    @Autowired
    private CartRepo cartRepo;

    @Autowired
    private DateFormatUtil dateFormatUtil;

    @Override
    @Transactional
    public Cart addProductToCart(String productName, long quantity) {

        PetiniUser user = userService.getAuthenticatedUser();
        Cart customerCart = cartRepo.findUserSavedCart(user.getUsername()).orElse(null);
        if (customerCart == null) {
            customerCart = new Cart();
            customerCart.setCreatedBy(user.getUsername());
            customerCart.setCreatedDate(dateFormatUtil.formatDateTimeNowToString());
            customerCart.setCustomer(user.getCustomerProperty());
            customerCart.setStatus(CartStatus.SAVED.name());
            user.getCustomerProperty().setCart(customerCart);
            customerCart = cartRepo.save(customerCart);
        }

        long totalPrice = customerCart.getTotalPrice();
        Product product = productService.findProductByName(productName);
        if (quantity > product.getQuantity()) {
            throw new InvalidException("Exceed product quantity");
        }

        CartProduct newCartProduct = new CartProduct();
        newCartProduct.setCartProductId(new CartProductId(customerCart.getId(), product.getId()));
        newCartProduct.setCart(customerCart);
        newCartProduct.setProduct(product);
        newCartProduct.setQuantity(quantity);
        cartProductRepo.save(newCartProduct);
        product.setCartProduct(List.of(newCartProduct));
        customerCart.setCartProduct(List.of(newCartProduct));
        for (CartProduct p : customerCart.getCartProduct()) {
            totalPrice = p.getCart().getTotalPrice() + p.getProduct().getPrice() * p.getQuantity();
        }
        customerCart.setTotalPrice(totalPrice);
        customerCart.setUpdatedBy(customerCart.getCustomer().getUser().getUsername());
        return customerCart;
    }

    @Override
    public Cart findCustomerCart() {
        PetiniUser user = userService.getAuthenticatedUser();
        Cart customerCart = user.getCustomerProperty().getCart();

        return customerCart;
    }

}
