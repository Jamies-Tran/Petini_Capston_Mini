package com.capstone.mini.petini.implementation;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.capstone.mini.petini.dto.request.BookingAfterCareRequestDto;
import com.capstone.mini.petini.handlers.exceptions.NotFoundException;
import com.capstone.mini.petini.model.AfterCareWorkingSchedule;
import com.capstone.mini.petini.model.Booking;
import com.capstone.mini.petini.model.BookingAfterCare;
import com.capstone.mini.petini.model.PetiniAfterCare;
import com.capstone.mini.petini.model.PetiniUser;
import com.capstone.mini.petini.model.status.WorkingHourStatus;
import com.capstone.mini.petini.repositories.AfterCareWorkingScheduleRepo;
import com.capstone.mini.petini.repositories.BookingAfterCareRepo;
import com.capstone.mini.petini.repositories.BookingRepo;
import com.capstone.mini.petini.service.IBookingService;
import com.capstone.mini.petini.service.IPetiniAfterCareService;
import com.capstone.mini.petini.service.IUserService;

@Service
public class BookingService implements IBookingService {

    @Autowired
    private BookingAfterCareRepo bookingAfterCareRepo;

    @Autowired
    private AfterCareWorkingScheduleRepo afterCareWorkingScheduleRepo;

    @Autowired
    private BookingRepo bookingRepo;

    @Autowired
    private IPetiniAfterCareService petiniAfterCareService;

    @Autowired
    private IUserService userService;

    @Override
    public Booking createBookingForAfterCare(List<BookingAfterCareRequestDto> afterRequestList) {
        Booking booking = new Booking();
        PetiniUser user = userService.getAuthenticatedUser();
        List<BookingAfterCare> bookingAfterCares = new ArrayList<>();
        List<AfterCareWorkingSchedule> schedules = new ArrayList<>();
        for (BookingAfterCareRequestDto b : afterRequestList) {
            BookingAfterCare bookingAfterCare = new BookingAfterCare();
            schedules = b.getTimeLabel().stream()
                    .map(t -> afterCareWorkingScheduleRepo.findWorkingScheduleByTimeLabel(t).get())
                    .collect(Collectors.toList());
            PetiniAfterCare afterCare = petiniAfterCareService.getPetiniAfterCareByName(b.getServiceName());
            booking.setShedules(schedules);
            schedules.forEach(s -> s.setBookings(List.of(booking)));
            bookingAfterCare.setBooking(booking);
            bookingAfterCare.setPetiniAfterCare(afterCare);

        }

        Long totalBookingPrice = 0L;
        // for (PetiniAfterCare s : afterCareList) {
        // BookingAfterCare bookingAfterCare = new BookingAfterCare();

        // bookingAfterCare.setPetiniAfterCare(s);
        // bookingAfterCare.setPrice(s.getPrice());
        // bookingAfterCare.setBooking(booking);
        // bookingAfterCares.add(bookingAfterCare);

        // }
        for (BookingAfterCare b : bookingAfterCares) {
            totalBookingPrice = totalBookingPrice + b.getPrice();
        }
        List<BookingAfterCare> savedBookingAfterCares = bookingAfterCareRepo.saveAll(bookingAfterCares);
        booking.setBookingAfterCare(savedBookingAfterCares);
        booking.setTotalPrice(totalBookingPrice);
        booking.setCustomer(user.getCustomerProperty());
        user.getCustomerProperty().setBookings(List.of(booking));
        Booking savedBooking = bookingRepo.save(booking);
        afterRequestList.forEach(a -> {
            a.getTimeLabel().forEach(t -> {
                AfterCareWorkingSchedule schedule = afterCareWorkingScheduleRepo.findWorkingScheduleByTimeLabel(t)
                        .orElseThrow(() -> new NotFoundException("Not found working schedule"));
                schedule.setStatus(WorkingHourStatus.BUSY.name());
                afterCareWorkingScheduleRepo.save(schedule);

            });
        });

        return savedBooking;

    }

    @Override
    public Boolean validateBookingDate(String timeLabel) {
        AfterCareWorkingSchedule schedule = afterCareWorkingScheduleRepo.findWorkingScheduleByTimeLabel(timeLabel)
                .get();
        if (schedule.getStatus().equals(WorkingHourStatus.BUSY.name())) {
            return false;
        }

        return true;
    }

    @Override
    public Booking getBookingDetail(Long id) {
        Booking booking = bookingRepo.findById(id).orElseThrow(() -> new NotFoundException("booking not found"));

        return booking;
    }

    @Override
    public List<Booking> getCustomerBookingList() {
        PetiniUser user = userService.getAuthenticatedUser();
        List<Booking> bookings = bookingRepo.getCustomerBookingList(user.getUsername());

        return bookings;
    }

    @Override
    public List<Booking> getAllBooking() {
        List<Booking> bookings = bookingRepo.findAll();

        return bookings;
    }

    @Override
    public List<Booking> getAllBookingByStatus(String status) {
        List<Booking> bookings = bookingRepo.getAllBookingByStatus(status);
        return bookings;
    }

}
