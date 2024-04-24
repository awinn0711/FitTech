package com.fitTech.demo.controllers;

import com.fitTech.demo.data.RecipeRepository;
import com.fitTech.demo.models.DTO.NutritionFactsDTO;
import com.fitTech.demo.models.Recipe;
import com.fitTech.demo.service.RecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/api/recipes")
public class RecipeController {

    @Autowired
    private RecipeRepository recipeRepository;

    @Autowired
    RecipeService recipeService;

    public RecipeController(RecipeRepository recipeRepository) {
        this.recipeRepository = recipeRepository;
    }

    @GetMapping("/all/{userEmail}")
    public ResponseEntity<List<Recipe>> recipes(@PathVariable String userEmail) {
        List<Recipe> recipeList = recipeService.getAllByUser(userEmail);
        return ResponseEntity.ok().body(recipeList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Recipe> getRecipeById(@PathVariable int id) {
        Optional<Recipe> recipe = recipeRepository.findById(id);
        return recipe.map(value -> ResponseEntity.ok().body(value)).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Recipe> addRecipe(@RequestBody Recipe recipe) {
        //calls method to post recipe info to edamam api for nutrition info
        NutritionFactsDTO nutritionFactsDTO = recipeService.getRecipeNutritionFacts(recipe);
        recipe.setCalories(nutritionFactsDTO.nutritionFacts.get("calories"));

        Recipe savedRecipe = recipeRepository.save(recipe);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedRecipe);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRecipe(@PathVariable int id) {
        recipeRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{recipeId}")
    public ResponseEntity<?> editRecipe(@PathVariable int recipeId, @RequestBody Recipe editedRecipeData) {
        Optional<Recipe> optionalRecipe = recipeRepository.findById(recipeId);
        if (optionalRecipe.isPresent()) {
            Recipe existingRecipe = optionalRecipe.get();
            existingRecipe.setName(editedRecipeData.getName());
            existingRecipe.setDescription(editedRecipeData.getDescription());
            existingRecipe.setIngredients(editedRecipeData.getIngredients());

            //call method to post recipe info to edamam api for nutritional data
            NutritionFactsDTO nutritionFactsDTO = recipeService.getRecipeNutritionFacts(existingRecipe);
            existingRecipe.setCalories(nutritionFactsDTO.nutritionFacts.get("calories"));

            Recipe savedRecipe = recipeRepository.save(existingRecipe);
            return ResponseEntity.ok(savedRecipe);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
