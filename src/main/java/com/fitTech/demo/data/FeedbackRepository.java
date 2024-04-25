package com.fitTech.demo.data;

import com.fitTech.demo.models.Feedback;
import org.springframework.data.repository.CrudRepository;

public interface FeedbackRepository extends CrudRepository<Feedback, Integer> {

}
