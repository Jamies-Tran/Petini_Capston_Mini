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
public class BookingResponseDto {
    private Long id;
    private List<BookingAfterCareResponseDto> bookingAfterCare;
    private List<AfterCareWorkingHourResponseDto> bookingSchedules;
    private String totalPrice;

}
