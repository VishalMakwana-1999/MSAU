package com.msau.onboard.entity;

import java.util.ArrayList;
import java.util.List;

public class Skills {
    private List<Skill> skillList= new ArrayList<>();

    public void setSkillList(List<Skill> skillList){
        this.skillList=skillList;
    }

    public List<Skill> getSkillList() {
        return skillList;
    }
}
