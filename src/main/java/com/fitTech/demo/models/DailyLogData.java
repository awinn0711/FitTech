package com.fitTech.demo.models;

import com.fitTech.demo.models.DTO.DateDTO;

import java.time.LocalDate;

public class DailyLogData {

public static DailyLog findByDate (DateDTO aDate, Iterable<DailyLog> allLogs) {
    for (DailyLog log : allLogs) {
        if (log.getDate().getDate().equals(aDate.getDate())) {
            return log;
        }
    } return null;
}
}
