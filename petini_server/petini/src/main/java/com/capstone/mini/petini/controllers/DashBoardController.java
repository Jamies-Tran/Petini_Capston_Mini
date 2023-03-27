package com.capstone.mini.petini.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.capstone.mini.petini.dto.DashboardDto;
import com.capstone.mini.petini.model.Dashboard;
import com.capstone.mini.petini.service.IDashboardService;

@RestController
@RequestMapping("/api/dashboard")
public class DashBoardController {
    @Autowired
    private IDashboardService dashboardService;

    @Autowired
    private ModelMapper modelMapper;

    @GetMapping
    @PreAuthorize("hasRole('ROLE_SHOPOWNER')")
    public ResponseEntity<?> getDashBoard() {
        Dashboard dashboard = dashboardService.generatePetiniDashBoard();
        DashboardDto responseDashBoard = modelMapper.map(dashboard, DashboardDto.class);

        return new ResponseEntity<DashboardDto>(responseDashBoard, HttpStatus.OK);
    }
}
