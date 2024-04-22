package com.fitTech.demo.service.impl;

import com.fitTech.demo.data.IngredientRepository;
import com.fitTech.demo.models.DTO.IngredientDTO;
import com.fitTech.demo.models.DTO.NutritionFactsDTO;
import com.fitTech.demo.models.Ingredient;
import com.fitTech.demo.service.IngredientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Service
public class IngredientServiceImpl implements IngredientService {
    @Value("${api.id}")
    private String apiId;
    @Value("${api.key}")
    private String apiKey;

    @Autowired
    RestTemplate restTemplate;

    @Autowired
    private IngredientRepository ingredientRepository;

    public IngredientServiceImpl(){};

    @Override
    public Ingredient findByName(Ingredient anIngredient) {
        Iterable<Ingredient> allIngredients = ingredientRepository.findAll();
        for(Ingredient ingredient: allIngredients) {
            if(ingredient.getName().equals(anIngredient.getName())) {
                return ingredient;
            }
        }
        return null;
    }

    @Override
    public NutritionFactsDTO getIngredientNutritionFacts(Ingredient ingredient) {
        NutritionFactsDTO nutritionFactsDTO = new NutritionFactsDTO();
        String ingr = ingredient.getName();
        String url = "https://api.edamam.com/api/nutrition-data?app_id="+apiId+"&" +
                "app_key="+apiKey+"&nutrition-type=cooking&ingr="+ingr;
        ResponseEntity<HashMap> response = restTemplate.getForEntity(url, HashMap.class);
        System.out.println(response);
        nutritionFactsDTO.setNutritionFacts(response.getBody());
        return nutritionFactsDTO;
    }
}
