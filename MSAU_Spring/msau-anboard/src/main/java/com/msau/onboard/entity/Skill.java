package com.msau.onboard.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Skill {
    private int id;
    private int demandId;
    private String skillName;
    private String level;
    public Skill(String skillName,String level){}
}
