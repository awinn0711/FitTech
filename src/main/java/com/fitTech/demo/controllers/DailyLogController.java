package com.fitTech.demo.controllers;

import com.fitTech.demo.data.DailyLogRepository;
import com.fitTech.demo.models.DailyLog;
import com.fitTech.demo.models.DailyLogData;
import jakarta.persistence.criteria.CriteriaBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("dailylog")
public class DailyLogController {

    @Autowired
    private DailyLogRepository dailyLogRepository;

    @GetMapping()
    public DailyLog dailyLog() {
        DailyLog todaysLog;
        LocalDate date = LocalDate.now();
        Optional<DailyLog> result = Optional.ofNullable(DailyLogData.findByDate(date, dailyLogRepository.findAll()));
        if (result.isEmpty()) {
            todaysLog = new DailyLog();
            dailyLogRepository.save(todaysLog);
            return todaysLog;
        }else {
            todaysLog = result.get();
            return todaysLog;
        }
    }

}
