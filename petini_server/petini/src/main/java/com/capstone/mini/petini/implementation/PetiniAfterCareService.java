package com.capstone.mini.petini.implementation;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.capstone.mini.petini.handlers.exceptions.DuplicateException;
import com.capstone.mini.petini.handlers.exceptions.NotFoundException;
import com.capstone.mini.petini.model.AfterCareWorkingSchedule;
import com.capstone.mini.petini.model.PetiniAfterCare;
import com.capstone.mini.petini.model.PetiniUser;
import com.capstone.mini.petini.model.status.PetiniAfterCareStatus;
import com.capstone.mini.petini.repositories.AfterCareWorkingScheduleRepo;
import com.capstone.mini.petini.repositories.PetiniAftercareRepo;
import com.capstone.mini.petini.service.IPetiniAfterCareService;
import com.capstone.mini.petini.service.IUserService;
import com.capstone.mini.petini.util.DateFormatUtil;

@Service
public class PetiniAfterCareService implements IPetiniAfterCareService {

    @Autowired
    private PetiniAftercareRepo petiniAfterCareRepo;

    @Autowired
    private AfterCareWorkingScheduleRepo afterCareWorkingScheduleRepo;

    @Autowired
    private IUserService userService;

    @Autowired
    private DateFormatUtil dateFormatUtil;

    @Override
    public PetiniAfterCare createService(PetiniAfterCare petiniAfterCare) {
        PetiniUser user = userService.getAuthenticatedUser();
        List<AfterCareWorkingSchedule> schedules = new ArrayList<>();
        if (petiniAfterCareRepo.findPetiniAfterCareByName(petiniAfterCare.getName()).isPresent()) {
            throw new DuplicateException(petiniAfterCare.getName() + " has been created");
        }
        for (AfterCareWorkingSchedule s : petiniAfterCare.getAfterCareWorkingSchedules()) {
            if (afterCareWorkingScheduleRepo.findWorkingScheduleByTimeLabel(s.getTimeLabel()).isPresent()) {
                AfterCareWorkingSchedule afterCareWorkingSchedule = afterCareWorkingScheduleRepo
                        .findWorkingScheduleByTimeLabel(s.getTimeLabel()).get();
                schedules.add(afterCareWorkingSchedule);

            } else {
                schedules.add(s);
            }
        }
        petiniAfterCare.setAfterCareWorkingSchedules(schedules);
        petiniAfterCare.setShopOwner(user.getShopOwnerProperty());
        petiniAfterCare.setCreatedBy(user.getUsername());
        petiniAfterCare.setCreatedDate(dateFormatUtil.formatDateTimeNowToString());
        user.getShopOwnerProperty().setServices(List.of(petiniAfterCare));
        PetiniAfterCare savedAfterCare = petiniAfterCareRepo.save(petiniAfterCare);
        return savedAfterCare;
    }

    @Override
    public PetiniAfterCare getPetiniAfterCareByName(String name) {
        PetiniAfterCare petiniAfterCare = petiniAfterCareRepo.findPetiniAfterCareByName(name)
                .orElseThrow(() -> new NotFoundException("Can't find service"));

        return petiniAfterCare;
    }

    @Override
    public List<PetiniAfterCare> getPetiniAfterCareList() {
        List<PetiniAfterCare> afterCareList = petiniAfterCareRepo.getAllAvailablePetiniAfterCare();

        return afterCareList;
    }

    @Override
    @Transactional
    public PetiniAfterCare updatePetiniAfterCare(String serviceName, PetiniAfterCare newService) {
        PetiniUser user = userService.getAuthenticatedUser();
        List<PetiniAfterCare> petiniAfterCares = this.getPetiniAfterCareList();
        PetiniAfterCare petiniAfterCare = this.getPetiniAfterCareByName(serviceName);
        for (PetiniAfterCare c : petiniAfterCares) {
            if (!c.getName().equals(serviceName)) {
                if (c.getName().equals(newService.getName())) {
                    throw new DuplicateException(newService.getName() + " has been created");
                }
            }

        }

        newService.setUpdatedBy(user.getUsername());
        newService.setUpdatedDate(dateFormatUtil.formatDateTimeNowToString());
        PetiniAfterCare updatedService = petiniAfterCare.newPetiniAfterCareBuilder(newService);

        return updatedService;
    }

    @Override
    @Transactional
    public PetiniAfterCare deletePetiniAfterCare(String serviceName) {
        PetiniAfterCare petiniAfterCare = this.getPetiniAfterCareByName(serviceName);
        petiniAfterCare.setStatus(PetiniAfterCareStatus.DELETED.name());

        return petiniAfterCare;
    }

}
