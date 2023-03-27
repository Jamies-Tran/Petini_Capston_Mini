package com.capstone.mini.petini.implementation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.capstone.mini.petini.model.Dashboard;
import com.capstone.mini.petini.repositories.BookingRepo;
import com.capstone.mini.petini.repositories.DashBoardRepo;
import com.capstone.mini.petini.repositories.OrderRepo;
import com.capstone.mini.petini.repositories.PetiniUserRepo;
import com.capstone.mini.petini.service.IDashboardService;
import com.capstone.mini.petini.util.DateFormatUtil;

@Service
public class DashboardService implements IDashboardService {

    @Autowired
    private PetiniUserRepo userRepo;

    @Autowired
    private OrderRepo orderRepo;

    @Autowired
    private BookingRepo bookingRepo;

    @Autowired
    private DashBoardRepo dashBoardRepo;

    @Autowired
    private DateFormatUtil dateFormatUtil;

    @Override
    public Dashboard generatePetiniDashBoard() {
        Dashboard dashboard = dashBoardRepo.findExistingDashBoard().orElse(null);
        Long customers = userRepo.getNumberOfCustomer();
        Long successOrders = orderRepo.getNumberOfSuccessOrder();
        Long successBooking = bookingRepo.getNumberOfSuccessBooking();

        if (dashboard == null) {
            dashboard = new Dashboard();
            dashboard.setCustomers(customers);
            dashboard.setSuccessOrders(successOrders);
            dashboard.setSuccessBookings(successBooking);
            dashboard.setCreatedDate(dateFormatUtil.formatDateTimeNowToString());
            dashboard = dashBoardRepo.save(dashboard);
        } else {
            dashboard.setCustomers(customers);
            dashboard.setSuccessOrders(successOrders);
            dashboard.setSuccessBookings(successBooking);
            dashboard.setUpdatedDate(dateFormatUtil.formatDateTimeNowToString());
        }

        return dashboard;
    }

}
