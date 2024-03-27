package com.fitTech.demo.service;

import com.fitTech.demo.models.DTO.DailyLogDTO;
import com.fitTech.demo.models.DailyLog;

public interface DailyLogService {

    DailyLogDTO createDailyLog(DailyLogDTO dailyLogDTO);
}
