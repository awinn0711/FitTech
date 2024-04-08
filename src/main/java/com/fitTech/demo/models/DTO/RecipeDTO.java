package com.fitTech.demo.models.DTO;

import com.fitTech.demo.models.Ingredient;
import jakarta.persistence.ManyToMany;

import java.util.List;

public class RecipeDTO {

    private String name;
    private String description;

    private List<Ingredient> ingredients;

    public RecipeDTO() {

    }

    public RecipeDTO(String name, String description, List<Ingredient> ingredients) {
        this.name = name;
        this.description = description;
        this.ingredients = ingredients;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<Ingredient> getIngredients() {
        return ingredients;
    }

    public void setIngredients(List<Ingredient> ingredients) {
        this.ingredients = ingredients;
    }
}
