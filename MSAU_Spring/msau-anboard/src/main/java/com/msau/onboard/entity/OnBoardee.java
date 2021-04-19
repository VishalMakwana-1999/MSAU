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
    private int bgcStatus;
    private int managerId;
    private String location;
    private int etaCompletion;
    private String email;
    private String dob;
    private int onboardStatus;
    MSManager manager;
    Skills skills;
}
