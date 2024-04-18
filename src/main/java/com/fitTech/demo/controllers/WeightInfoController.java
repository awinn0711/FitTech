package com.fitTech.demo.controllers;

import com.fitTech.demo.data.WeightInfoRepository;
import com.fitTech.demo.models.WeightInfo;
import com.fitTech.demo.service.WeightInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/api/weightinfo/{userEmail}")
public class WeightInfoController {

    @Autowired
    private WeightInfoService weightInfoService;

    @Autowired
    WeightInfoRepository weightInfoRepository;

    @GetMapping()
    public ResponseEntity<WeightInfo> getWeightInfo(@PathVariable String userEmail) {
        WeightInfo weightInfo;
        Optional<WeightInfo> result = Optional.ofNullable(weightInfoService.findByUserEmail(userEmail));
        if(result.isEmpty()) {
            weightInfo = new WeightInfo(userEmail);
            weightInfoRepository.save(weightInfo);
            return new ResponseEntity<>(weightInfo, HttpStatus.CREATED);
        } else {
            weightInfo = result.get();
            return ResponseEntity.ok().body(weightInfo);
        }
    }

    @PostMapping()
    public ResponseEntity<WeightInfo> setTargetWeight(@PathVariable String userEmail, @PathVariable int targetWeight) {
        WeightInfo weightInfo = weightInfoService.findByUserEmail(userEmail);
        weightInfo.setWeightGoal(targetWeight);
        weightInfoRepository.save(weightInfo);
        return ResponseEntity.ok(weightInfo);
    }

    @PostMapping()
    public ResponseEntity<WeightInfo> setCurrentWeight(@PathVariable String userEmail, @PathVariable int newWeight) {
        WeightInfo weightInfo = weightInfoService.findByUserEmail(userEmail);
        weightInfo.setCurrentWeight(newWeight);
        weightInfoRepository.save(weightInfo);
        return ResponseEntity.ok(weightInfo);
    }
}
