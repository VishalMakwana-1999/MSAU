package com.msau.onboard.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MSManager {
    private int managerId;
    private String managerFName;
    private String managerLname;
}
