package com.msau.onboard.dao;

import com.msau.onboard.entity.OnBoardee;

import java.util.List;

public interface OnBoardeeRepository {
    OnBoardee saveOnBoardee(OnBoardee onBoardee);
    OnBoardee updateOnBoardee(OnBoardee onBoardee);
    OnBoardee getOnBoardeebyId(int DemandId);
    List<OnBoardee> getOnBoardees();
    OnBoardee deleteOnBoardee();
}
