package com.msau.onboard.controller;

import com.msau.onboard.dao.OnBoardeeImpl;
import com.msau.onboard.dao.OnBoardeeRepository;
import com.msau.onboard.entity.MSManager;
import com.msau.onboard.entity.OnBoardee;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;

@RunWith(MockitoJUnitRunner.class)
@SpringBootTest
class OnBoardeeControllerTest {

    @Mock
    private OnBoardeeRepository onBoardeeRepository;
    @InjectMocks
    private OnBoardeeController onBoardeeController;
    @Test
    void getOnBoardees() {
        List<OnBoardee> onboardees = new ArrayList();
        onboardees.add(new OnBoardee(1,"Vishal","Makwana"));
        given(onBoardeeRepository.getOnBoardees("")).willReturn(onboardees);
        List<OnBoardee> expected = onBoardeeController.getOnBoardees();
        assertEquals(expected, onboardees);
        verify(onBoardeeRepository).getOnBoardees("");
    }

    @Test
    void searchOnboardees() {
        List<OnBoardee> onBoardees = new ArrayList();
        onBoardees.add(new OnBoardee());
        given(onBoardeeRepository.getOnBoardees("Yash")).willReturn(onBoardees);
        List<OnBoardee> expected = onBoardeeController.searchOnboardees("Yash");
        assertEquals(expected, onBoardees);
        verify(onBoardeeRepository).getOnBoardees("Yash");
    }

    @Test
    void updateOnBoardee() {
        HashMap<String,Object> map=new HashMap<>();
        map.put("Status",200);
        map.put("Message","Onboardee details edited successfully");
        given(onBoardeeRepository.updateOnBoardee(new OnBoardee())).willReturn(map);
        HashMap<String,Object> expected= onBoardeeController.updateOnBoardee(new OnBoardee());
        assertEquals(expected,map);
        verify(onBoardeeRepository).updateOnBoardee(new OnBoardee());
    }

    @Test
    void getOnBoardeebyId() {
        OnBoardee ob=new OnBoardee(1,"Vishal","Makwana");
        given(onBoardeeRepository.getOnBoardeebyId(1)).willReturn(ob);
        OnBoardee expected = onBoardeeController.getOnBoardeebyId(1);
        assertEquals(expected, ob);
        verify(onBoardeeRepository).getOnBoardeebyId(1);
    }

    @Test
    void deleteOnBoardee() {
        HashMap<String,Object> map=new HashMap<>();
        map.put("Status",200);
        map.put("Message","Onboardee deleted successfully");
        given(onBoardeeRepository.deleteOnBoardee(1)).willReturn(map);
        HashMap<String,Object> expected= onBoardeeController.deleteOnBoardee(1);
        assertEquals(expected,map);
        verify(onBoardeeRepository).deleteOnBoardee(1);
    }

    @Test
    void saveOnboardee() {
        HashMap<String,Object> map=new HashMap<>();
        map.put("Status",200);
        map.put("Message","Onboardee created successfully");
        given(onBoardeeRepository.saveOnBoardee(new OnBoardee())).willReturn(map);
        HashMap<String,Object> expected= onBoardeeController.saveOnboardee(new OnBoardee());
        assertEquals(expected,map);
        verify(onBoardeeRepository).saveOnBoardee(new OnBoardee());
    }

    @Test
    void fetchManagers() {
        List<MSManager> managers = new ArrayList();
        managers.add(new MSManager());
        given(onBoardeeRepository.fetchManagers()).willReturn(managers);
        List<MSManager> expected = onBoardeeController.fetchManagers();
        assertEquals(expected, managers);
        verify(onBoardeeRepository).fetchManagers();
    }

    @Test
    void fetchSkills() {
        HashMap<String,Object> map=new HashMap<>();
        map.put("skills",new ArrayList<String>());
        map.put("count",new ArrayList<Integer>());
        given(onBoardeeRepository.fetchSkills()).willReturn(map);
        HashMap<String,Object> expected= onBoardeeController.fetchSkills();
        assertEquals(expected,map);
        verify(onBoardeeRepository).fetchSkills();
    }

    @Test
    void fetchLocationTrends() {
        HashMap<String,Object> map=new HashMap<>();
        map.put("location",new ArrayList<String>());
        map.put("count",new ArrayList<Integer>());
        given(onBoardeeRepository.fetchLocationTrends()).willReturn(map);
        HashMap<String,Object> expected= onBoardeeController.fetchLocationTrends();
        assertEquals(expected,map);
        verify(onBoardeeRepository).fetchLocationTrends();
    }

    @Test
    void fetchManagerTrends() {
        HashMap<String,Object> map=new HashMap<>();
        map.put("managers",new ArrayList<String>());
        map.put("count",new ArrayList<Integer>());
        given(onBoardeeRepository.fetchManagerTrends()).willReturn(map);
        HashMap<String,Object> expected= onBoardeeController.fetchManagerTrends();
        assertEquals(expected,map);
        verify(onBoardeeRepository).fetchManagerTrends();
    }

    @Test
    void fetchYearTrends() {
        HashMap<String,Object> map=new HashMap<>();
        map.put("year",new ArrayList<String>());
        map.put("count",new ArrayList<Integer>());
        given(onBoardeeRepository.fetchYearTrends()).willReturn(map);
        HashMap<String,Object> expected= onBoardeeController.fetchYearTrends();
        assertEquals(expected,map);
        verify(onBoardeeRepository).fetchYearTrends();
    }
}