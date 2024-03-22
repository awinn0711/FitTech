package com.fitTech.demo.controllers;

import com.fitTech.demo.data.DailyLogRepository;
import com.fitTech.demo.models.DailyLog;
import com.fitTech.demo.models.DailyLogData;
import com.fitTech.demo.models.Date;
import jakarta.persistence.criteria.CriteriaBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/dailylog/")
public class DailyLogController {

    @Autowired
    private DailyLogRepository dailyLogRepository;


    @GetMapping()
    public DailyLog dailyLog() {
        DailyLog todaysLog;
        Date checkDate = new Date(LocalDate.now());
        Optional<DailyLog> result = Optional.ofNullable(DailyLogData.findByDate(checkDate, dailyLogRepository.findAll()));
        if (result.isEmpty()) {
            todaysLog = new DailyLog(checkDate);
            dailyLogRepository.save(todaysLog);
            return todaysLog;
        }else {
            todaysLog = result.get();
            return todaysLog;
        }
    }

}
