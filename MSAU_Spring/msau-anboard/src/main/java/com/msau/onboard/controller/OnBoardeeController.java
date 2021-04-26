package com.msau.onboard.controller;

import com.msau.onboard.dao.OnBoardeeRepository;
import com.msau.onboard.entity.MSManager;
import com.msau.onboard.entity.OnBoardee;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.swing.plaf.synth.SynthTextAreaUI;
import java.util.HashMap;
import java.util.List;

@RestController
public class OnBoardeeController {
    Logger logger= LoggerFactory.getLogger(OnBoardeeController.class);

    @Autowired
    OnBoardeeRepository onBoardeeRepository;
    @GetMapping("/api/fetch_onboardees")
    public List<OnBoardee> getOnBoardees(){
        logger.info("Onboardees List was requested");
        return onBoardeeRepository.getOnBoardees("");
    }
    @GetMapping("/api/fetch_onboardees/search/{name}")
    public List<OnBoardee> searchOnboardees(@PathVariable("name") String name){
        logger.info("Onboardee requested by search");
        return onBoardeeRepository.getOnBoardees(name);
    }
    @PostMapping("/api/update")
    public HashMap<String, Object> updateOnBoardee(@RequestBody OnBoardee onBoardee){
        logger.info("Request to Update Onboardee");
        return onBoardeeRepository.updateOnBoardee(onBoardee);
    }
    @GetMapping("/api/fetch_onboardees/{id}")
    public OnBoardee getOnBoardeebyId(@PathVariable("id") int id){
        logger.info("Onboardee with id:"+Integer.toString(id)+" was requested");
        return onBoardeeRepository.getOnBoardeebyId(id);
    }

    @GetMapping("/api/delete/{id}")
    public HashMap<String,Object> deleteOnBoardee(@PathVariable("id") int id){
        logger.info("Delete Onboardee with id:"+Integer.toString(id)+" was requested");
        return onBoardeeRepository.deleteOnBoardee(id);
    }
    @PostMapping("/api/create")
    public HashMap<String,Object> saveOnboardee(@RequestBody OnBoardee onBoardee){
        logger.info("Request to create new onboardee");
        return onBoardeeRepository.saveOnBoardee(onBoardee);
    }
    @GetMapping("/api/fetch_managers")
    public List<MSManager> fetchManagers(){
        logger.info("Manager List was requested");
        return onBoardeeRepository.fetchManagers();
    }
}
