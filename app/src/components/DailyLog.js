import React, { useEffect, useState } from 'react';

export default function DailyLog() {

    const [dailyLog, setDailyLog] = useState ([]);

    useEffect(() => {
        fetch('<http://localhost:8080/dailylog>')
          .then(response => response.json())
          .then(data => setDailyLog(data))
          .catch(error => console.error('Error fetching data:', error));
      }, []);

    return (
        <h1>{dailyLog.date}</h1>
    )
}