package com.fitTech.demo.models;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.Objects;

@Entity
public class DailyLog {

    @Id
    @GeneratedValue
    private int id;

    @ManyToOne
    private User user;

    private Ingredient ingredient;

    @OneToOne(cascade = CascadeType.ALL)
    public LocalDate date;


    public DailyLog() {};
    public DailyLog (User user, Ingredient ingredient, LocalDate date) {
        this.user = user;
        this.ingredient = ingredient;
        this.date = date;
    };

    public int getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Ingredient getIngredient() {
        return ingredient;
    }

    public void setIngredient(Ingredient ingredient) {
        this.ingredient = ingredient;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        DailyLog dailyLog = (DailyLog) o;
        return id == dailyLog.id;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
