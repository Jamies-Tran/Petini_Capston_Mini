package com.capstone.mini.petini.model;

import java.util.List;

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
public class ShopOwner {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(mappedBy = "shopOwner")
    private @Setter List<Product> products;

    @OneToMany(mappedBy = "shopOwner")
    private @Setter List<PetiniAfterCare> services;

    @OneToMany(mappedBy = "shopOwner")
    private @Setter List<Pet> pets;

    @OneToOne(mappedBy = "shopOwnerProperty")
    private @Setter PetiniUser user;
}
