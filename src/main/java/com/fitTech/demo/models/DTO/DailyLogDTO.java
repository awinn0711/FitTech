package com.fitTech.demo.models.DTO;

import com.fitTech.demo.models.Date;
import com.fitTech.demo.models.Ingredient;

import java.util.List;

public class DailyLogDTO {

    private List<Ingredient> ingredients;

    public Date date;

    public DailyLogDTO(Date date) {
        this.date = date;
    }

    public DailyLogDTO(List<Ingredient> ingredients) {
        super();

        this.ingredients = ingredients;
    }



    public List<Ingredient> getIngredients() {
        return ingredients;
    }

    public void setIngredients(List<Ingredient> ingredients) {
        this.ingredients = ingredients;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

}
