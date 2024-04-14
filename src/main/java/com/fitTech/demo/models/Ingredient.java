package com.fitTech.demo.models;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class Ingredient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;
    private String category;
    private int calories;

    @ManyToMany(mappedBy = "ingredients")
    private List<DailyLog> dailyLogs;

    public Ingredient() {};

    public Ingredient(String name) {
        this.name = name;
    }

    public Ingredient(String name, String category) {
        this.name = name;
        this.category = category;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public int getId() {
        return id;
    }

    public int getCalories() {
        return calories;
    }

    public void setCalories(int calories) {
        this.calories = calories;
    }
}
