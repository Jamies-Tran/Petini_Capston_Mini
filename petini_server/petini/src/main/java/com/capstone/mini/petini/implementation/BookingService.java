package com.capstone.mini.petini.implementation;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.capstone.mini.petini.dto.request.BookingAfterCareRequestDto;
import com.capstone.mini.petini.handlers.exceptions.NotFoundException;
import com.capstone.mini.petini.model.AfterCareWorkingSchedule;
import com.capstone.mini.petini.model.Booking;
import com.capstone.mini.petini.model.BookingAfterCare;
import com.capstone.mini.petini.model.PetiniAfterCare;
import com.capstone.mini.petini.model.PetiniUser;
import com.capstone.mini.petini.model.status.BookingStatus;
import com.capstone.mini.petini.model.status.WorkingHourStatus;
import com.capstone.mini.petini.repositories.AfterCareWorkingScheduleRepo;
// import com.capstone.mini.petini.repositories.BookingAfterCareRepo;
import com.capstone.mini.petini.repositories.BookingRepo;
import com.capstone.mini.petini.service.IBookingService;
import com.capstone.mini.petini.service.IPetiniAfterCareService;
import com.capstone.mini.petini.service.IUserService;
import com.capstone.mini.petini.util.DateFormatUtil;

@Service
public class BookingService implements IBookingService {

    // @Autowired
    // private BookingAfterCareRepo bookingAfterCareRepo;

    @Autowired
    private AfterCareWorkingScheduleRepo afterCareWorkingScheduleRepo;

    @Autowired
    private BookingRepo bookingRepo;

    @Autowired
    private IPetiniAfterCareService petiniAfterCareService;

    @Autowired
    private IUserService userService;

    @Autowired
    private DateFormatUtil dateFormatUtil;

    @Override
    public Booking createBookingForAfterCare(List<BookingAfterCareRequestDto> afterRequestList) {
        Booking booking = new Booking();
        PetiniUser user = userService.getAuthenticatedUser();
        List<BookingAfterCare> bookingAfterCares = new ArrayList<>();
        Long totalBookingPrice = 0L;
        for (BookingAfterCareRequestDto b : afterRequestList) {
            BookingAfterCare bookingAfterCare = new BookingAfterCare();
            List<AfterCareWorkingSchedule> schedules = b.getTimeLabel().stream()
                    .map(t -> afterCareWorkingScheduleRepo.findWorkingScheduleByTimeLabel(t).get())
                    .collect(Collectors.toList());
            PetiniAfterCare afterCare = petiniAfterCareService.getPetiniAfterCareByName(b.getServiceName());
            booking.setBookingSchedules(schedules);
            schedules.forEach(s -> {
                s.setBookings(List.of(booking));
                s.setStatus(WorkingHourStatus.BUSY.name());
            });
            bookingAfterCare.setBooking(booking);
            bookingAfterCare.setPetiniAfterCare(afterCare);
            bookingAfterCare.setPrice(afterCare.getPrice());
            bookingAfterCares.add(bookingAfterCare);
        }

        for (BookingAfterCare b : bookingAfterCares) {
            totalBookingPrice = totalBookingPrice + b.getPrice();
        }

        booking.setBookingAfterCare(bookingAfterCares);
        booking.setTotalPrice(totalBookingPrice);
        booking.setCustomer(user.getCustomerProperty());
        user.getCustomerProperty().setBookings(List.of(booking));
        booking.setCreatedBy(user.getUsername());
        booking.setCreatedDate(dateFormatUtil.formatDateTimeNowToString());
        Booking savedBooking = bookingRepo.save(booking);

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

    @Override
    @Transactional
    public Booking changeBookingStatus(String status, Long id) {
        Booking booking = this.getBookingDetail(id);
        List<BookingAfterCare> bookingAfterCareList = booking.getBookingAfterCare();
        for (BookingAfterCare b : bookingAfterCareList) {
            for (AfterCareWorkingSchedule a : b.getBooking().getBookingSchedules()) {
                a.setStatus(WorkingHourStatus.FREE.name());
            }

        }
        PetiniUser user = userService.getAuthenticatedUser();
        String bookingStatus = "";
        switch (status.toUpperCase()) {
            case "FINISHED":
                bookingStatus = BookingStatus.FINISHED.name();
                break;
            case "PROCESSING":
                bookingStatus = BookingStatus.PROCESSING.name();
                break;
            default:
                bookingStatus = BookingStatus.PROCESSING.name();
                break;
        }
        booking.setStatus(bookingStatus);
        booking.setUpdatedBy(user.getUsername());
        booking.setUpdatedDate(dateFormatUtil.formatDateTimeNowToString());

        return booking;
    }

}
