package com.fitTech.demo.service;

import com.fitTech.demo.models.DTO.IngredientDTO;
import com.fitTech.demo.models.DTO.NutritionFactsDTO;
import com.fitTech.demo.models.Ingredient;
public interface IngredientService {

    Ingredient findByName(Ingredient anIngredient);

    NutritionFactsDTO getIngredientNutritionFacts(Ingredient ingredient);

}
