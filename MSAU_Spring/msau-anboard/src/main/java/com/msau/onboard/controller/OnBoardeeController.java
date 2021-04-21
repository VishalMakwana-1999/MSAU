package com.msau.onboard.controller;

import com.msau.onboard.dao.OnBoardeeRepository;
import com.msau.onboard.entity.OnBoardee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class OnBoardeeController {
    @Autowired
    OnBoardeeRepository onBoardeeRepository;

    @GetMapping("/fetch_onboardees")
    public List<OnBoardee> getOnBoardees(){
        return onBoardeeRepository.getOnBoardees();
    }
    @PostMapping("/update")
    public OnBoardee updateOnBoardee(@RequestBody OnBoardee onBoardee){
        return onBoardeeRepository.updateOnBoardee(onBoardee);
    }
    @GetMapping("/fetch_onboardees/{id}")
    public OnBoardee getOnBoardeebyId(@PathVariable("id") int id){
        return onBoardeeRepository.getOnBoardeebyId(id);
    }
}
