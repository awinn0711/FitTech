package com.fitTech.demo.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "recipe")
public class Recipe {

    @Id
    @GeneratedValue
    private int id;

    private String name;
    private String description;
    @JsonProperty("ingr")
    private ArrayList<String> ingr = new ArrayList<>();
    private int calories;
    private double gramsFat;
    private double gramsCarbs;
    private double gramsProtein;


    @ManyToMany
    private List<DailyLog> dailyLogs;

    public Recipe() {

    }

    public Recipe(String name, String description, ArrayList<String> ingredients) {
        this.name = name;
        this.description = description;
        this.ingr = ingredients;
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

    public double getCalories() {
        return calories;
    }

    public void setCalories(int calories) {
        this.calories = calories;
    }

    public double getGramsFat() {
        return gramsFat;
    }

    public void setGramsFat(double gramsFat) {
        this.gramsFat = gramsFat;
    }

    public double getGramsCarbs() {
        return gramsCarbs;
    }

    public void setGramsCarbs(double gramsCarbs) {
        this.gramsCarbs = gramsCarbs;
    }

    public double getGramsProtein() {
        return gramsProtein;
    }

    public void setGramsProtein(double gramsProtein) {
        this.gramsProtein = gramsProtein;
    }

    public ArrayList<String> getIngredients() {
        return ingr;
    }

    public void setIngredients(ArrayList<String> ingredients) {
        this.ingr = ingredients;
    }

    public int getId() {
        return id;
    }

}
