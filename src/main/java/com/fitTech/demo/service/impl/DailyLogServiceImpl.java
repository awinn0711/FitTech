package com.fitTech.demo.service.impl;

import com.fitTech.demo.data.DailyLogRepository;
import com.fitTech.demo.models.DTO.DailyLogDTO;
import com.fitTech.demo.service.DailyLogService;
import org.springframework.stereotype.Service;

@Service
public class DailyLogServiceImpl implements DailyLogService {

    private DailyLogRepository dailyLogRepository;

    public DailyLogServiceImpl(DailyLogRepository dailyLogRepository) {
        this.dailyLogRepository = dailyLogRepository;
    }

    @Override
    public DailyLogDTO createDailyLog(DailyLogDTO dailyLogDTO) {
        return null;
    }
}
