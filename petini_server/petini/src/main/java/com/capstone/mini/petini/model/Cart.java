package com.capstone.mini.petini.model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class Cart extends BaseModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private @Setter Long totalPrice = 0L;

    @OneToOne(mappedBy = "cart")
    private @Setter Customer customer;

    private @Setter Long quantity;

    @OneToMany(mappedBy = "cart", cascade = { CascadeType.PERSIST, CascadeType.REMOVE })
    private @Setter List<CartProduct> cartProduct;
}