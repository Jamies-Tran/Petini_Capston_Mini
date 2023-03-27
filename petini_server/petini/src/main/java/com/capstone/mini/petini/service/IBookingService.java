package com.capstone.mini.petini.service;

import java.util.List;

import com.capstone.mini.petini.dto.request.BookingAfterCareRequestDto;
import com.capstone.mini.petini.model.Booking;

public interface IBookingService {
    Booking createBookingForAfterCare(List<BookingAfterCareRequestDto> afterRequestList);

    Boolean validateBookingDate(String timeLabel);

    Booking getBookingDetail(Long id);

    Booking changeBookingStatus(String status, Long id);

    List<Booking> getCustomerBookingList();

    List<Booking> getAllBooking();

    List<Booking> getAllBookingByStatus(String status);
}
