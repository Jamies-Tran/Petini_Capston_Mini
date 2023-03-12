package com.capstone.mini.petini.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class BookingAfterCareResponseDto {
    private PetiniAfterCareResponseDto petiniAfterCare;
    private Long price;
}
