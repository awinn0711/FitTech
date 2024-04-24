package com.fitTech.demo.service;

import com.fitTech.demo.models.DTO.DailyLogDTO;
import com.fitTech.demo.models.DTO.DateDTO;
import com.fitTech.demo.models.DailyLog;
import com.fitTech.demo.models.Ingredient;
import com.fitTech.demo.models.Recipe;
import org.springframework.stereotype.Service;

import java.util.List;

public interface DailyLogService {

    DailyLogDTO createDailyLog(DailyLogDTO dailyLogDTO);

    DailyLog findByDateAndUser (DateDTO aDate, String userEmail);

    List<DailyLog> getAllLogsByUser(String userEmail);

    void addRecipeToLog(DailyLog log, Recipe recipe);

    void addIngredientToLog(DailyLog log, Ingredient ingredient);


}
