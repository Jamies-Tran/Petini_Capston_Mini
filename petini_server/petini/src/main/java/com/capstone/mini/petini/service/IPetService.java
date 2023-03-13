package com.capstone.mini.petini.service;

import java.util.List;

import com.capstone.mini.petini.model.Pet;

public interface IPetService {
    List<Pet> createPetList(List<Pet> petList);

    Pet findPetByName(String name);

    List<Pet> getAllPets();

    List<Pet> getPetListByType(String petType);

    List<Pet> getPetListByAgeRange(int ageFrom, int ageTo);

    List<Pet> getPetListByColor(String color);

    List<Pet> getPetListByStatus(String status);

}
