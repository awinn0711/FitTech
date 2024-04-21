package com.fitTech.demo.service.impl;

import com.fitTech.demo.data.WeightInfoRepository;
import com.fitTech.demo.models.WeightInfo;
import com.fitTech.demo.service.WeightInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class WeightInfoServiceImpl implements WeightInfoService {

    @Autowired
    private WeightInfoRepository weightInfoRepository;

    public WeightInfoServiceImpl(){};

    @Override
    public WeightInfo findByUserEmail(String userEmail) {
        for(WeightInfo weightInfo: weightInfoRepository.findAll()) {
            if(weightInfo.getUserEmail().equals(userEmail)) {
                return weightInfo;
            }
        } return null;
    }
}
