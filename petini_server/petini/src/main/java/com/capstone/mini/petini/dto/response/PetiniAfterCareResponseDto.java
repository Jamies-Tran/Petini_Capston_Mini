package com.capstone.mini.petini.dto.response;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class PetiniAfterCareResponseDto {
    private Long id;
    private String name;
    private Long price;
    private String status;
    private List<AfterCareWorkingHourResponseDto> afterCareWorkingSchedules;
}
