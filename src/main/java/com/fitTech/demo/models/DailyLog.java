package com.fitTech.demo.models;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Objects;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

@Entity
@Table(name = "log")
public class DailyLog {

    @Id
    @GeneratedValue
    private int id;

//    @ManyToOne
    private User user;

    private List<Ingredient> ingredients;

    @OneToOne(cascade = CascadeType.ALL)
    public Date date;


    public DailyLog(Date date) {
        this.date = date;
    };
    public DailyLog (User user) {
        super();
        this.user = user;
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
