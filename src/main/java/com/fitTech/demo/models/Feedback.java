package com.fitTech.demo.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table
public class Feedback {

    @Id
    @GeneratedValue
    private int id;

    @JsonProperty("userEmail")
    private String userEmail;

    private String description;

    //public Date date;

    public Feedback() {

    }

    public Feedback(String userEmail, String description) {
        //this.date = date;
        this.userEmail = userEmail;
        this.description = description;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
