package com.fitTech.demo.controllers;

import com.fitTech.demo.data.FeedbackRepository;
import com.fitTech.demo.models.Feedback;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/feedback")
public class FeedbackController {

    @Autowired
    private FeedbackRepository feedbackRepository;

    @PostMapping("/submit")
    public ResponseEntity<Feedback> submitFeedback(@RequestBody Feedback feedback) {
        Feedback submittedFeedback = feedbackRepository.save(feedback);
        return new ResponseEntity<>(submittedFeedback, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Feedback>> getAllFeedback() {
        Iterable<Feedback> allFeedbackIterable = feedbackRepository.findAll();
        List<Feedback> allFeedback = new ArrayList<>();
        allFeedbackIterable.forEach(allFeedback::add);
        return new ResponseEntity<>(allFeedback, HttpStatus.OK);
    }
}

