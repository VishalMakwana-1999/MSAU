package com.msau.onboard.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Skills {
    private List<Skill> skillList= new ArrayList<>();

    public void setSkillList(List<Skill> skillList){
        this.skillList=skillList;
    }

    public List<Skill> getSkillList() {
        return skillList;
    }
}
