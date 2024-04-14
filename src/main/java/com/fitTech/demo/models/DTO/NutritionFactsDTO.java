package com.fitTech.demo.models.DTO;

import jakarta.persistence.criteria.CriteriaBuilder;

import java.util.HashMap;

public class NutritionFactsDTO {

    public HashMap<String, Integer> nutritionFacts = new HashMap<>();

    public NutritionFactsDTO(){};

    public HashMap<String, Integer> getNutritionFacts() {
        return nutritionFacts;
    }

    public void setNutritionFacts(HashMap<String, Integer> nutritionFacts) {
        this.nutritionFacts = nutritionFacts;
    }
}
