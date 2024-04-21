package com.fitTech.demo.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class WeightInfo {

    @Id
    @GeneratedValue
    private int id;

    private String userEmail;

    private int weightGoal;

    private int currentWeight;

    public WeightInfo() {};

    public WeightInfo(String userEmail) {
        super();
        this.userEmail = userEmail;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public int getWeightGoal() {
        return weightGoal;
    }

    public void setWeightGoal(int weightGoal) {
        this.weightGoal = weightGoal;
    }

    public int getCurrentWeight() {
        return currentWeight;
    }

    public void setCurrentWeight(int currentWeight) {
        this.currentWeight = currentWeight;
    }

    public int getId() {
        return id;
    }
}
