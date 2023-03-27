package com.capstone.mini.petini.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.capstone.mini.petini.model.Booking;

public interface BookingRepo extends JpaRepository<Booking, Long> {
    @Query(value = "select b from Booking b where b.customer.user.username = :username")
    List<Booking> getCustomerBookingList(@Param("username") String username);

    @Query(value = "select b from Booking b where b.status = :status")
    List<Booking> getAllBookingByStatus(@Param("status") String status);

    @Query(value = "select count(b) from Booking b where b.status = 'FINISHED'")
    Long getNumberOfSuccessBooking();
}
