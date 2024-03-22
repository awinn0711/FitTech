package com.fitTech.demo.data;

import com.fitTech.demo.models.DailyLog;
import org.springframework.data.repository.CrudRepository;

public interface DailyLogRepository extends CrudRepository<DailyLog, Integer> {
}
