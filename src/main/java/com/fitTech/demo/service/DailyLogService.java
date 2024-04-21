package com.fitTech.demo.service;

import com.fitTech.demo.models.DTO.DailyLogDTO;
import com.fitTech.demo.models.DTO.DateDTO;
import com.fitTech.demo.models.DailyLog;
import com.fitTech.demo.models.Ingredient;
import com.fitTech.demo.models.Recipe;
import org.springframework.stereotype.Service;

public interface DailyLogService {

    DailyLogDTO createDailyLog(DailyLogDTO dailyLogDTO);

    DailyLog findByDate (DateDTO aDate);

    void addRecipeToLog(DailyLog log, Recipe recipe);

    void addIngredientToLog(DailyLog log, Ingredient ingredient);


}
