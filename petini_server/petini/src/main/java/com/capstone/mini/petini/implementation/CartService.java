package com.capstone.mini.petini.implementation;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.capstone.mini.petini.repositories.CartProductRepo;

import com.capstone.mini.petini.handlers.exceptions.InvalidException;
import com.capstone.mini.petini.model.Cart;
import com.capstone.mini.petini.model.CartProduct;
import com.capstone.mini.petini.model.CartProductId;
import com.capstone.mini.petini.model.PetiniUser;
import com.capstone.mini.petini.model.Product;
import com.capstone.mini.petini.service.ICartService;
import com.capstone.mini.petini.service.IProductService;
import com.capstone.mini.petini.service.IUserService;

@Service
public class CartService implements ICartService {
    @Autowired
    private IProductService productService;

    @Autowired
    private IUserService userService;

    @Autowired
    private CartProductRepo cartProductRepo;

    @Override
    @Transactional
    public Cart addProductToCart(String productName, long quantity) {

        Cart customerCart = this.findCustomerCart();

        long totalPrice = customerCart.getTotalPrice();
        Product product = productService.findProductByName(productName);
        if (quantity > product.getQuantity()) {
            throw new InvalidException("Exceed product quantity");
        }
        List<CartProduct> currentCartProduct = customerCart.getCartProduct();
        CartProduct newCartProduct = new CartProduct();
        newCartProduct.setCartProductId(new CartProductId(customerCart.getId(), product.getId()));
        newCartProduct.setCart(customerCart);
        newCartProduct.setProduct(product);
        newCartProduct.setQuantity(quantity);
        cartProductRepo.save(newCartProduct);
        product.setCartProduct(List.of(newCartProduct));
        currentCartProduct.add(newCartProduct);
        for (CartProduct p : currentCartProduct) {
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
