package com.capstone.mini.petini.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class OrderResponseDto extends BaseResponseDto {
    private Long id;
    private String status;
    private CartResponseDto cart;

}
