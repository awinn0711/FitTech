package com.fitTech.demo.controllers;

import com.fitTech.demo.data.DailyLogRepository;
import com.fitTech.demo.data.IngredientRepository;
import com.fitTech.demo.data.RecipeRepository;
import com.fitTech.demo.models.DTO.*;
import com.fitTech.demo.models.DailyLog;
import com.fitTech.demo.models.Date;
import com.fitTech.demo.models.Ingredient;
import com.fitTech.demo.models.Recipe;
import com.fitTech.demo.service.DailyLogService;
import com.fitTech.demo.service.IngredientService;
import com.fitTech.demo.service.RecipeService;
import jakarta.persistence.criteria.CriteriaBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

//@CrossOrigin(origins = "http://localhost:8080")//bc frontend and backend are running on different servers, this annotation allows frontend to fetch data from another server
@CrossOrigin
@RestController
@RequestMapping("/api/dailylog/{userEmail}")
public class DailyLogController {

    @Autowired
    private DailyLogRepository dailyLogRepository;

    @Autowired
    private RecipeRepository recipeRepository;

    @Autowired
    private IngredientRepository ingredientRepository;

    @Autowired
    private DailyLogService dailyLogService;

    @Autowired
    private RecipeService recipeService;

    @Autowired
    private IngredientService ingredientService;

    @GetMapping()
    public ResponseEntity<DailyLog> dailyLog(@PathVariable String userEmail) {
        //check if dailyLog object exists for current date and user. if so return it, if not, create new object
        DailyLog todaysLog;
        DateDTO checkDate = new DateDTO(LocalDate.now());
        Optional<DailyLog> result = Optional.ofNullable(dailyLogService.findByDateAndUser(checkDate, userEmail));
        if (result.isEmpty()) {
            Date todaysDate = new Date(checkDate.getDate());
            todaysLog = new DailyLog(todaysDate, userEmail);
            dailyLogRepository.save(todaysLog);
            return new ResponseEntity<>(todaysLog, HttpStatus.CREATED);
        }else {
            todaysLog = result.get();
            return ResponseEntity.ok().body(todaysLog);
        }
    }

    @GetMapping("getall")
    public ResponseEntity<List<DailyLog>> allLogs(@PathVariable String userEmail) {
        List<DailyLog> dailyLogList = dailyLogService.getAllLogsByUser(userEmail);
        return ResponseEntity.ok().body(dailyLogList);
    }

    @PostMapping("addRecipeToLog")
    public ResponseEntity<DailyLog> addRecipeToLog(@PathVariable String userEmail, @RequestBody Recipe recipe) {
        DateDTO checkDate = new DateDTO(LocalDate.now());
        DailyLog log = dailyLogService.findByDateAndUser(checkDate, userEmail);

        Optional<Recipe> result = recipeRepository.findById(recipe.getId());
        if(result.isEmpty()) {
            throw new RuntimeException("Can't find recipe!");
        }else {
            Recipe recipeToAdd = result.get();
            dailyLogService.addRecipeToLog(log, recipeToAdd);
            return ResponseEntity.ok(log);
        }
    }

    @DeleteMapping("/removeRecipeFromLog/{recipeId}")
    public ResponseEntity<Void> removeRecipeFromLog(@PathVariable String userEmail, @PathVariable int recipeId) {
        DateDTO checkDate = new DateDTO(LocalDate.now());
        DailyLog log = dailyLogService.findByDateAndUser(checkDate, userEmail);

        Optional<Recipe> recipeToRemoveOptional = log.getRecipes().stream()
                .filter(recipe -> recipe.getId() == recipeId)
                .findFirst();

        if (recipeToRemoveOptional.isPresent()) {
            Recipe recipeToRemove = recipeToRemoveOptional.get();
            log.getRecipes().remove(recipeToRemove);
            dailyLogRepository.save(log);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("addIngredientToLog")
    public ResponseEntity<DailyLog> addIngredientToLog(@PathVariable String userEmail, @RequestBody Ingredient anIngredient) {
        Ingredient newIngredient;
        Optional<Ingredient> result = Optional.ofNullable(ingredientService.findByName(anIngredient));
        if(result.isEmpty()) {
            newIngredient = new Ingredient(anIngredient.getName());
            ingredientRepository.save(newIngredient);
        } else {
            newIngredient = result.get();
        }
        DateDTO checkDate = new DateDTO(LocalDate.now());
        DailyLog log = dailyLogService.findByDateAndUser(checkDate, userEmail);

        //get nutrition facts from edamam api
        NutritionFactsDTO nutritionFactsDTO = ingredientService.getIngredientNutritionFacts(newIngredient);
        newIngredient.setCalories(nutritionFactsDTO.nutritionFacts.get("calories"));
        dailyLogService.addIngredientToLog(log, newIngredient);
        return ResponseEntity.ok(log);
    }

    @DeleteMapping("/removeIngredientFromLog/{ingredientId}")
    public ResponseEntity<Void> removeIngredientFromLog(@PathVariable String userEmail, @PathVariable int ingredientId) {
        DateDTO checkDate = new DateDTO(LocalDate.now());
        DailyLog log = dailyLogService.findByDateAndUser(checkDate, userEmail);

        Optional<Ingredient> ingredientToRemoveOptional = log.getIngredients().stream()
                .filter(ingredient -> ingredient.getId() == ingredientId)
                .findFirst();

        if (ingredientToRemoveOptional.isPresent()) {
            Ingredient ingredientToRemove = ingredientToRemoveOptional.get();
            log.getIngredients().remove(ingredientToRemove);
            dailyLogRepository.save(log);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }



}
