package com.msau.onboard.dao;

import com.msau.onboard.entity.MSManager;
import com.msau.onboard.entity.OnBoardee;

import java.util.HashMap;
import java.util.List;

public interface OnBoardeeRepository {
    HashMap<String,Object> saveOnBoardee(OnBoardee onBoardee);
    HashMap<String,Object> updateOnBoardee(OnBoardee onBoardee);
    OnBoardee getOnBoardeebyId(int DemandId);
    List<OnBoardee> getOnBoardees(String name);
    HashMap<String,Object> deleteOnBoardee(int DemandId);
    List<MSManager> fetchManagers();
    HashMap<String,Object> fetchSkills();
    HashMap<String,Object> fetchLocationTrends();
    HashMap<String,Object> fetchManagerTrends();
    HashMap<String,Object> fetchYearTrends();
}
