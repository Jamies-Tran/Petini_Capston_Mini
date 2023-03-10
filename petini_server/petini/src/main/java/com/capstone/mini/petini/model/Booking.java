package com.capstone.mini.petini.model;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class Booking extends BaseModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private @Setter String startDate;

    @OneToMany(mappedBy = "booking")
    private @Setter List<BookingAfterCare> petiniServices;

    @ManyToMany
    @JoinTable(name = "booking_schedule", joinColumns = @JoinColumn(name = "booking_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "schedule_id", referencedColumnName = "id"))
    private @Setter List<AfterCareWorkingSchdule> afterCareWorkingSchedules;

    @Column
    private @Setter Long totalPrice;

    @ManyToOne
    private @Setter Customer customer;
}
