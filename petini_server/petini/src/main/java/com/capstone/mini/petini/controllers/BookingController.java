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

import com.capstone.mini.petini.dto.request.BookingAfterCareRequestDto;
import com.capstone.mini.petini.dto.response.BookingResponseDto;
import com.capstone.mini.petini.model.Booking;
import com.capstone.mini.petini.service.IBookingService;

@RestController
@RequestMapping("/api/booking")
public class BookingController {

    @Autowired
    private IBookingService bookingService;

    @Autowired
    private ModelMapper modelMapper;

    @PostMapping("/new-booking")
    @PreAuthorize("hasRole('ROLE_CUSTOMER')")
    public ResponseEntity<?> createServiceBooking(@RequestBody List<BookingAfterCareRequestDto> afterCareRequestDtos) {
        Booking booking = bookingService.createBookingForAfterCare(afterCareRequestDtos);
        BookingResponseDto responseBooking = modelMapper.map(booking, BookingResponseDto.class);

        return new ResponseEntity<BookingResponseDto>(responseBooking, HttpStatus.OK);
    }

    @GetMapping("/date-validation")
    @PreAuthorize("hasRole('ROLE_CUSTOMER')")
    public ResponseEntity<?> checkValidBooking(String timeLabel) {
        Boolean isValidDate = bookingService.validateBookingDate(timeLabel);

        return new ResponseEntity<Boolean>(isValidDate, HttpStatus.OK);
    }

    @GetMapping("/detail-id")
    @PreAuthorize("hasAnyRole('ROLE_CUSTOMER', 'ROLE_SHOPOWNER')")
    public ResponseEntity<?> getBookingById(Long id) {
        Booking booking = bookingService.getBookingDetail(id);
        BookingResponseDto responseBooking = modelMapper.map(booking, BookingResponseDto.class);

        return new ResponseEntity<BookingResponseDto>(responseBooking, HttpStatus.OK);
    }

    @GetMapping("/list-customer")
    @PreAuthorize("hasAnyRole('ROLE_CUSTOMER', 'ROLE_SHOPOWNER')")
    public ResponseEntity<?> getCustomerBookingList() {
        List<Booking> bookings = bookingService.getCustomerBookingList();
        List<BookingResponseDto> responseBookingList = bookings.stream()
                .map(b -> modelMapper.map(b, BookingResponseDto.class)).collect(Collectors.toList());

        return new ResponseEntity<List<BookingResponseDto>>(responseBookingList, HttpStatus.OK);
    }

    @GetMapping("/list-status")
    @PreAuthorize("hasAnyRole('ROLE_CUSTOMER', 'ROLE_SHOPOWNER')")
    public ResponseEntity<?> getBookingListByStatus(String status) {
        List<Booking> bookings = bookingService.getAllBookingByStatus(status);
        List<BookingResponseDto> responseBookingList = bookings.stream()
                .map(b -> modelMapper.map(b, BookingResponseDto.class)).collect(Collectors.toList());

        return new ResponseEntity<List<BookingResponseDto>>(responseBookingList, HttpStatus.OK);

    }

    @GetMapping("/all")
    @PreAuthorize("hasAnyRole('ROLE_CUSTOMER', 'ROLE_SHOPOWNER')")
    public ResponseEntity<?> getAllBooking() {
        List<Booking> bookings = bookingService.getAllBooking();
        List<BookingResponseDto> responseBookingList = bookings.stream()
                .map(b -> modelMapper.map(b, BookingResponseDto.class)).collect(Collectors.toList());

        return new ResponseEntity<List<BookingResponseDto>>(responseBookingList, HttpStatus.OK);
    }
}
