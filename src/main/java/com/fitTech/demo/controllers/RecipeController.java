package com.fitTech.demo.controllers;

import com.fitTech.demo.data.RecipeRepository;
import com.fitTech.demo.models.Recipe;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

//@CrossOrigin(origins = "http://localhost:3000")
@CrossOrigin
@RestController
@RequestMapping("/api/recipes")
public class RecipeController {

    private RecipeRepository recipeRepository;

    public RecipeController(RecipeRepository recipeRepository) {
        this.recipeRepository = recipeRepository;
    }

    @GetMapping
    public ResponseEntity<List<Recipe>> recipes() {
        List<Recipe> recipeList = new ArrayList<>();
        recipeRepository.findAll().forEach(recipeList::add);
        return ResponseEntity.ok().body(recipeList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Recipe> getRecipeById(@PathVariable int id) {
        Optional<Recipe> recipe = recipeRepository.findById(id);
        return recipe.map(value -> ResponseEntity.ok().body(value)).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Recipe> addRecipe(@RequestBody Recipe recipe) {
        Recipe savedRecipe = recipeRepository.save(recipe);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedRecipe);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRecipe(@PathVariable int id) {
        recipeRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

}
