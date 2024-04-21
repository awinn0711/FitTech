package com.fitTech.demo.service;

import com.fitTech.demo.models.WeightInfo;

public interface WeightInfoService {

    WeightInfo findByUserEmail(String userEmail);
}
