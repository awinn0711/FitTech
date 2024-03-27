package com.fitTech.demo.models.DTO;

import com.fitTech.demo.models.Date;
import com.fitTech.demo.models.Ingredient;
import com.fitTech.demo.models.User;

import java.util.List;
import java.util.Objects;

public class DailyLogDTO {

    private User user;

    private List<Ingredient> ingredients;

    public Date date;

    public DailyLogDTO(Date date) {
        this.date = date;
    }

    public DailyLogDTO(User user, List<Ingredient> ingredients) {
        super();
        this.user = user;
        this.ingredients = ingredients;
    }


    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
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
