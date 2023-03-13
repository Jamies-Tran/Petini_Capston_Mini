package com.capstone.mini.petini.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class PetRequestDto {
    private String name;
    private String imageUrl;
    private String color;
    private String petType;
    private Double weight;
    private Integer age;
    private String gender;
    private String description;

}
