package com.capstone.mini.petini.model;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "booking_service")
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class BookingAfterCare {
    @EmbeddedId
    private BookingAfterCareId bookingAfterCareId;

    @MapsId("bookingId")
    @ManyToOne
    private Booking booking;

    @MapsId("afterCareId")
    @ManyToOne
    private PetiniAfterCare petiniAfterCare;

    @Column
    private Long price;
}
