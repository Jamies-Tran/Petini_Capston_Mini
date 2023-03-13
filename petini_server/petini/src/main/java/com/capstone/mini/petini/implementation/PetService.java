package com.capstone.mini.petini.implementation;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.capstone.mini.petini.handlers.exceptions.DuplicateException;
import com.capstone.mini.petini.handlers.exceptions.NotFoundException;
import com.capstone.mini.petini.model.Pet;
import com.capstone.mini.petini.model.PetiniUser;
import com.capstone.mini.petini.repositories.PetRepo;
import com.capstone.mini.petini.service.IPetService;
import com.capstone.mini.petini.service.IUserService;
import com.capstone.mini.petini.util.DateFormatUtil;

@Service
public class PetService implements IPetService {
    @Autowired
    private PetRepo petRepo;

    @Autowired
    private IUserService userService;

    @Autowired
    private DateFormatUtil dateFormatUtil;

    @Override
    public List<Pet> createPetList(List<Pet> petList) {
        PetiniUser user = userService.getAuthenticatedUser();
        for (Pet p : petList) {
            String name = p.getName();
            if (petList.stream().filter(e -> e.getName().equals(name)).collect(Collectors.toList()).size() > 1) {
                throw new DuplicateException("Name of pet must be unique to each one");
            } else if (petRepo.findPetByName(p.getName()).isPresent()) {
                throw new DuplicateException("Name of pet has been registered by another one");
            }
            p.setShopOwner(user.getShopOwnerProperty());
            p.setCreatedBy(user.getUsername());
            p.setCreatedDate(dateFormatUtil.formatDateTimeNowToString());

        }
        user.getShopOwnerProperty().setPets(petList);
        List<Pet> savedPetList = petRepo.saveAll(petList);

        return savedPetList;
    }

    @Override
    public Pet findPetByName(String name) {
        Pet pet = petRepo.findPetByName(name).orElseThrow(() -> new NotFoundException("Can't find pet"));

        return pet;
    }

    @Override
    public List<Pet> getAllPets() {
        List<Pet> petList = petRepo.findAll();

        return petList;
    }

    @Override
    public List<Pet> getPetListByType(String petType) {
        List<Pet> petList = petRepo.findPetListByType(petType);

        return petList;
    }

    @Override
    public List<Pet> getPetListByAgeRange(int ageFrom, int ageTo) {
        List<Pet> petList = petRepo.findPetListByAgeRange(ageFrom, ageTo);

        return petList;
    }

    @Override
    public List<Pet> getPetListByColor(String color) {
        List<Pet> petList = petRepo.findPetListByColor(color);

        return petList;
    }

    @Override
    public List<Pet> getPetListByStatus(String status) {
        List<Pet> petList = petRepo.findPetListByStatus(status);

        return petList;
    }

}
