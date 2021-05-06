package com.msau.onboard.dao;

import com.msau.onboard.controller.OnBoardeeController;
import com.msau.onboard.entity.MSManager;
import com.msau.onboard.entity.OnBoardee;
import com.msau.onboard.entity.Skill;
import com.msau.onboard.entity.Skills;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;
@RunWith(MockitoJUnitRunner.class)
@SpringBootTest
class OnBoardeeImplTest {
    @Autowired
    private OnBoardeeRepository  onBoardeeRepository;

    @Test
    void saveOnBoardee() {
        Skill skill= new Skill("Java","Expert");
        ArrayList<Skill> skillList= new ArrayList<>();
        skillList.add(skill);
        OnBoardee onBoardee= new OnBoardee(14,"Vishal","Makwana","2021-10-01","Idle",12,"Mumbai","2021-07-01"

        ,"newemailtest@gmail.com","1999-10-01","Idle",null,new Skills(skillList),"9819800059");
        HashMap<String,Object> map=onBoardeeRepository.saveOnBoardee(onBoardee);
        assertTrue(map.containsKey("Status"));
    }

    @Test
    void updateOnBoardee() {
        Skill skill= new Skill("Java","Expert");
        ArrayList<Skill> skillList= new ArrayList<>();
        skillList.add(skill);
        OnBoardee onBoardee= new OnBoardee(14,"Vishal","Makwana","2021-10-01","Idle",12,"Mumbai","2021-07-01"

                ,"newemailtest@gmail.com","1999-10-01","Idle",null,new Skills(skillList),"9819800059");
        HashMap<String,Object> map=onBoardeeRepository.updateOnBoardee(onBoardee);
        assertTrue(map.containsKey("Status"));
    }

    @Test
    void getOnBoardeebyId() {
        OnBoardee onBoardee=  onBoardeeRepository.getOnBoardeebyId(2);
        assertTrue(onBoardee.getDemandId()==2);
    }

    @Test
    void getOnBoardees() {
        List<OnBoardee> onBoardees=onBoardeeRepository.getOnBoardees("");
        assertTrue(onBoardees.size()>0);
    }

    @Test
    void deleteOnBoardee() {
        HashMap<String,Object> map= new HashMap<>();
        map=onBoardeeRepository.deleteOnBoardee(14);
        assertTrue(map.containsKey("status"));
    }

    @Test
    void fetchManagers() {
        List<MSManager> managers= onBoardeeRepository.fetchManagers();
        assertTrue(managers.size()>0);
    }

    @Test
    void fetchSkills() {
        HashMap<String,Object> map=new HashMap<>();
        map=onBoardeeRepository.fetchSkills();
        assertTrue(map.size()==2);

    }

    @Test
    void fetchLocationTrends() {
        HashMap<String,Object> map=new HashMap<>();
        map=onBoardeeRepository.fetchLocationTrends();
        assertTrue(map.size()==2);
    }

    @Test
    void fetchManagerTrends() {
        HashMap<String,Object> map=new HashMap<>();
        map=onBoardeeRepository.fetchManagerTrends();
        assertTrue(map.size()==2);
    }

    @Test
    void fetchYearTrends() {
        HashMap<String,Object> map=new HashMap<>();
        map=onBoardeeRepository.fetchYearTrends();
        assertTrue(map.size()==2);
    }
}