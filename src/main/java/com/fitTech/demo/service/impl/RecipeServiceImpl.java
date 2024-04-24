package com.fitTech.demo.service.impl;

import com.fitTech.demo.data.RecipeRepository;
import com.fitTech.demo.models.DTO.NutritionFactsDTO;
import com.fitTech.demo.models.DTO.RecipeDTO;
import com.fitTech.demo.models.Recipe;
import com.fitTech.demo.service.RecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Service
public class RecipeServiceImpl implements RecipeService {

    @Value("${api.id}")
    private String apiId;
    @Value("${api.key}")
    private String apiKey;

    @Autowired
    RestTemplate restTemplate;

    @Autowired
    private RecipeRepository recipeRepository;

    public RecipeServiceImpl(){};

    @Override
   public NutritionFactsDTO getRecipeNutritionFacts(Recipe recipe){
        NutritionFactsDTO nutritionFactsDTO = new NutritionFactsDTO();
        String url = "https://api.edamam.com/api/nutrition-details?app_id="+apiId+"&app_key="+apiKey;

        HttpEntity<Recipe> recipeHttpEntity = new HttpEntity<>(recipe);
        ResponseEntity<HashMap> response = restTemplate.postForEntity(url, recipeHttpEntity, HashMap.class);
        System.out.println(response);

        nutritionFactsDTO.setNutritionFacts(response.getBody());
        return nutritionFactsDTO;
    }

    @Override
    public List<Recipe> getAllByUser(String userEmail) {
        List<Recipe> recipeList = new ArrayList<>();
        for(Recipe recipe : recipeRepository.findAll()) {
            if(recipe.getUserEmail().equals(userEmail)) {
                recipeList.add(recipe);
            }
        } return recipeList;
    }

    ;
}
