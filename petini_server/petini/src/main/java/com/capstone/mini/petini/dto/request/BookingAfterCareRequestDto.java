package com.capstone.mini.petini.dto.request;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class BookingAfterCareRequestDto {
    private String serviceName;
    private List<String> timeLabel;
}
