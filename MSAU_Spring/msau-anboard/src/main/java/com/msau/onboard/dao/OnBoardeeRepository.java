package com.msau.onboard.dao;

import com.msau.onboard.entity.OnBoardee;

import java.util.HashMap;
import java.util.List;

public interface OnBoardeeRepository {
    HashMap<String,Object> saveOnBoardee(OnBoardee onBoardee);
    OnBoardee updateOnBoardee(OnBoardee onBoardee);
    OnBoardee getOnBoardeebyId(int DemandId);
    List<OnBoardee> getOnBoardees();
    HashMap<String,Object> deleteOnBoardee(int DemandId);
}
