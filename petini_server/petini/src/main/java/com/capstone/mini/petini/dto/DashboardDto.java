package com.capstone.mini.petini.dto;

import com.capstone.mini.petini.dto.response.BaseResponseDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class DashboardDto extends BaseResponseDto {
    private Long id;
    private Long customers;
    private Long successOrders;
    private Long successBookings;
    private Long successAdoptedPet;

}
