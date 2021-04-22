package com.msau.onboard.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OnBoardee {
    private int demandId;
    private String fname;
    private String lname;
    private String startDate;
    private String bgcStatus;
    private int managerId;
    private String location;
    private String etaCompletion;
    private String email;
    private String dob;
    private String onboardStatus;
    MSManager manager;
    Skills skills;
}
