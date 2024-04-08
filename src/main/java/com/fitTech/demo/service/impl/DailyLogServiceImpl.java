package com.fitTech.demo.service.impl;

import com.fitTech.demo.data.DailyLogRepository;
import com.fitTech.demo.models.DTO.DailyLogDTO;
import com.fitTech.demo.models.DTO.DateDTO;
import com.fitTech.demo.models.DTO.RecipeDTO;
import com.fitTech.demo.models.DailyLog;
import com.fitTech.demo.models.Recipe;
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

    @Override
    public DailyLog findByDate (DateDTO aDate) {
        for (DailyLog log : dailyLogRepository.findAll()) {
            if (log.getDate().getDate().equals(aDate.getDate())) {
                return log;
            }
        } return null;
    }

    @Override
    public void addRecipeToLog(DailyLog log, Recipe recipe) {
        log.addRecipe(recipe);
        dailyLogRepository.save(log);
    }
}
