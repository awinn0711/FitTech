package com.fitTech.demo.models;

import java.time.LocalDate;

public class DailyLogData {

public static DailyLog findByDate (LocalDate aDate, Iterable<DailyLog> allLogs) {
    for (DailyLog log : allLogs) {
        if (log.getDate().equals(aDate)) {
            return log;
        }
    } return null;
}
}
