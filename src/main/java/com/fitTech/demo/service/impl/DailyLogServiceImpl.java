package com.fitTech.demo.service.impl;

import com.fitTech.demo.data.DailyLogRepository;
import com.fitTech.demo.models.DTO.DailyLogDTO;
import com.fitTech.demo.models.DTO.DateDTO;
import com.fitTech.demo.models.DTO.RecipeDTO;
import com.fitTech.demo.models.DailyLog;
import com.fitTech.demo.models.Ingredient;
import com.fitTech.demo.models.Recipe;
import com.fitTech.demo.service.DailyLogService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

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
    public DailyLog findByDateAndUser (DateDTO aDate, String userEmail) {
        for (DailyLog log : dailyLogRepository.findAll()) {
            if ((log.getDate().getDate().equals(aDate.getDate())) && (log.getUserEmail()).equals(userEmail)) {
                return log;
            }
        } return null;
    }

    @Override
    public List<DailyLog> getAllLogsByUser(String userEmail) {
        List<DailyLog> dailyLogList = new ArrayList<>();
        for (DailyLog log : dailyLogRepository.findAll()) {
            if(log.getUserEmail().equals(userEmail)) {
                dailyLogList.add(log);
            }
        } return dailyLogList;
    }


    @Override
    public void addRecipeToLog(DailyLog log, Recipe recipe) {
        log.addRecipe(recipe);
        dailyLogRepository.save(log);
    }

    @Override
    public void addIngredientToLog(DailyLog log, Ingredient ingredient) {
        log.addIngredient(ingredient);
        dailyLogRepository.save(log);
    }
}
