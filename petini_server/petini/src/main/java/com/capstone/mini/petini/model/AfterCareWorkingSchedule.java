package com.capstone.mini.petini.model;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import com.capstone.mini.petini.model.status.WorkingHourStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "service_scheduled")
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class AfterCareWorkingSchedule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private @Setter String timeLabel;

    @Column
    private @Setter String timeValue;

    @Column
    private @Setter String startDate;

    @Column
    private @Setter String status = WorkingHourStatus.FREE.name();

    @ManyToMany(mappedBy = "shedules")
    private @Setter List<Booking> bookings;

    @ManyToMany(mappedBy = "afterCareWorkingSchedules")
    private @Setter List<PetiniAfterCare> petiniAfterCares;

}
