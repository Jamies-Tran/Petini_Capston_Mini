package com.capstone.mini.petini.model;

import java.util.List;

import javax.persistence.CascadeType;
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
import javax.persistence.Table;

import com.capstone.mini.petini.model.status.PetiniAfterCareStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "petini_service")
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class PetiniAfterCare extends BaseModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "nvarchar(500)")
    private @Setter String name;

    @Column
    private @Setter Long price;

    @Column
    private @Setter String imageUrl;

    @Column
    private @Setter String description;

    @Column
    private @Setter String status = PetiniAfterCareStatus.ACTIVE.name();

    @OneToMany(mappedBy = "petiniAfterCare")
    private @Setter List<BookingAfterCare> petiniAfterCare;

    @ManyToMany(cascade = { CascadeType.PERSIST })
    @JoinTable(name = "service_schedule", joinColumns = @JoinColumn(name = "service_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "schedule_id", referencedColumnName = "id"))
    private @Setter List<AfterCareWorkingSchedule> afterCareWorkingSchedules;

    @ManyToOne
    private @Setter ShopOwner shopOwner;

    public PetiniAfterCare newPetiniAfterCareBuilder(PetiniAfterCare newService) {
        this.setName(newService.getName());
        this.setPrice(newService.getPrice());
        this.setAfterCareWorkingSchedules(newService.getAfterCareWorkingSchedules());
        this.setPetiniAfterCare(newService.getPetiniAfterCare());
        this.setDescription(newService.getDescription());
        this.setCreatedBy(newService.getCreatedBy());
        this.setImageUrl(newService.getImageUrl());
        this.setShopOwner(newService.getShopOwner());
        this.setStatus(newService.getStatus());
        this.setUpdatedBy(newService.getUpdatedBy());
        this.setUpdatedDate(newService.getUpdatedDate());

        return this;
    }
}
