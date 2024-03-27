package com.fitTech.demo.controllers;

import com.fitTech.demo.data.DailyLogRepository;
import com.fitTech.demo.models.DTO.DateDTO;
import com.fitTech.demo.models.DailyLog;
import com.fitTech.demo.models.DailyLogData;
import com.fitTech.demo.models.Date;
import jakarta.persistence.criteria.CriteriaBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/api/dailylog")
public class DailyLogController {

    @Autowired
    private DailyLogRepository dailyLogRepository;


    @GetMapping
    public ResponseEntity<DailyLog> dailyLog() {
        //check if dailyLog object exists for current date. if so return it, if not, create new object
        DailyLog todaysLog;
        DateDTO checkDate = new DateDTO(LocalDate.now());
        Optional<DailyLog> result = Optional.ofNullable(DailyLogData.findByDate(checkDate, dailyLogRepository.findAll()));
        if (result.isEmpty()) {
            Date todaysDate = new Date(checkDate.getDate());
            todaysLog = new DailyLog(todaysDate);
            dailyLogRepository.save(todaysLog);
            return new ResponseEntity<>(todaysLog, HttpStatus.CREATED);
        }else {
            todaysLog = result.get();
            return ResponseEntity.ok().body(todaysLog);
        }
    }

}
