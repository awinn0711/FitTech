package com.fitTech.demo.controllers;

import com.fitTech.demo.data.DailyLogRepository;
import com.fitTech.demo.models.DTO.DailyLogDTO;
import com.fitTech.demo.models.DTO.DateDTO;
import com.fitTech.demo.models.DTO.RecipeDTO;
import com.fitTech.demo.models.DailyLog;
import com.fitTech.demo.models.Date;
import com.fitTech.demo.models.Recipe;
import com.fitTech.demo.service.DailyLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Optional;

//@CrossOrigin(origins = "http://localhost:8080")//bc frontend and backend are running on different servers, this annotation allows frontend to fetch data from another server
@CrossOrigin
@RestController
@RequestMapping("/api/dailylog")
public class DailyLogController {

    @Autowired
    private DailyLogRepository dailyLogRepository;

    @Autowired
    private DailyLogService dailyLogService;

    @GetMapping
    public ResponseEntity<DailyLog> dailyLog() {
        //check if dailyLog object exists for current date. if so return it, if not, create new object
        DailyLog todaysLog;
        DateDTO checkDate = new DateDTO(LocalDate.now());
        Optional<DailyLog> result = Optional.ofNullable(dailyLogService.findByDate(checkDate));
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

    @PatchMapping("addRecipeToLog")
    public ResponseEntity<DailyLog> addRecipeToLog(@RequestBody Recipe recipe) {
        DateDTO checkDate = new DateDTO(LocalDate.now());
        DailyLog log = dailyLogService.findByDate(checkDate);
        dailyLogService.addRecipeToLog(log, recipe);
        return ResponseEntity.ok(log);
    }

}
