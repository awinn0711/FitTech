package com.fitTech.demo.service;

import com.fitTech.demo.models.DTO.NutritionFactsDTO;
import com.fitTech.demo.models.DTO.RecipeDTO;
import com.fitTech.demo.models.Recipe;
import org.springframework.stereotype.Service;

import java.util.List;

public interface RecipeService {
    NutritionFactsDTO getRecipeNutritionFacts(Recipe recipe);

    List<Recipe> getAllByUser(String userEmail);

}
