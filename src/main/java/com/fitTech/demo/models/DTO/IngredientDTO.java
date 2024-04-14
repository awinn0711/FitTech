package com.fitTech.demo.models.DTO;

public class IngredientDTO {

    private String name;
    private String category;
    private int calories;

    public IngredientDTO() {};

    public IngredientDTO(String name) {
        this.name=name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
