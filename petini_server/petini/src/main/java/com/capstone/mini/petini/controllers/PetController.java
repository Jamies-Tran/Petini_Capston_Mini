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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.capstone.mini.petini.dto.request.PetRequestDto;
import com.capstone.mini.petini.dto.response.PetResponseDto;
import com.capstone.mini.petini.model.Pet;
import com.capstone.mini.petini.service.IPetService;

@RestController
@RequestMapping("/api/pet")
public class PetController {
    @Autowired
    private IPetService petService;

    @Autowired
    private ModelMapper modelMapper;

    @PostMapping("/new-pet")
    @PreAuthorize("hasRole('ROLE_SHOPOWNER')")
    public ResponseEntity<?> createPetList(@RequestBody List<PetRequestDto> petRequestList) {
        List<Pet> petList = petRequestList.stream().map(p -> modelMapper.map(p, Pet.class))
                .collect(Collectors.toList());
        List<Pet> savedPetList = petService.createPetList(petList);
        List<PetResponseDto> responsePetList = savedPetList.stream().map(p -> modelMapper.map(p, PetResponseDto.class))
                .collect(Collectors.toList());

        return new ResponseEntity<List<PetResponseDto>>(responsePetList, HttpStatus.OK);
    }

    @GetMapping("/allow-all/pet-detail")
    public ResponseEntity<?> getPetByName(String name) {
        Pet pet = petService.findPetByName(name);
        PetResponseDto responsePet = modelMapper.map(pet, PetResponseDto.class);

        return new ResponseEntity<PetResponseDto>(responsePet, HttpStatus.OK);
    }

    @GetMapping("/allow-all/pets-type")
    public ResponseEntity<?> getPetListByType(String type) {
        List<Pet> petList = petService.getPetListByType(type);
        List<PetResponseDto> responsePetList = petList.stream().map(p -> modelMapper.map(p, PetResponseDto.class))
                .collect(Collectors.toList());

        return new ResponseEntity<List<PetResponseDto>>(responsePetList, HttpStatus.OK);
    }

    @GetMapping("/allow-all/pets-age")
    public ResponseEntity<?> getPetListByAgeRange(Integer ageFrom, Integer ageTo) {
        List<Pet> petList = petService.getPetListByAgeRange(ageFrom, ageTo);
        List<PetResponseDto> responsePetList = petList.stream().map(p -> modelMapper.map(p, PetResponseDto.class))
                .collect(Collectors.toList());

        return new ResponseEntity<List<PetResponseDto>>(responsePetList, HttpStatus.OK);
    }

    @GetMapping("/allow-all/pets-color")
    public ResponseEntity<?> getPetListByColor(String color) {
        List<Pet> petList = petService.getPetListByColor(color);
        List<PetResponseDto> responsePetList = petList.stream().map(p -> modelMapper.map(p, PetResponseDto.class))
                .collect(Collectors.toList());

        return new ResponseEntity<List<PetResponseDto>>(responsePetList, HttpStatus.OK);
    }

    @GetMapping("/allow-all/pets-status")
    public ResponseEntity<?> getPetListByStatus(String status) {
        List<Pet> petList = petService.getPetListByStatus(status);
        List<PetResponseDto> responsePetList = petList.stream().map(p -> modelMapper.map(p, PetResponseDto.class))
                .collect(Collectors.toList());

        return new ResponseEntity<List<PetResponseDto>>(responsePetList, HttpStatus.OK);
    }
}
