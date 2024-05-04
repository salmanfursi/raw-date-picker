import React, { useState } from 'react';

const DatePicker = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const daysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const generateCalendar = () => {
    const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
    const daysInCurrentMonth = daysInMonth(currentMonth.getMonth(), currentMonth.getFullYear());

    const calendar = [];

    let dayCounter = 1;
    for (let i = 0; i < 6; i++) {
      const week = [];
      for (let j = 0; j < 7; j++) {
        if ((i === 0 && j < firstDayOfMonth) || dayCounter > daysInCurrentMonth) {
          week.push(null);
        } else {
          week.push(dayCounter);
          dayCounter++;
        }
      }
      calendar.push(week);
      if (dayCounter > daysInCurrentMonth) {
        break;
      }
    }

    return calendar;
  };

  const handleDateClick = (day) => {
    const selected = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    setSelectedDate(selected);
  };

  const handleMonthChange = (increment) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() + increment);
    setCurrentMonth(newMonth);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ marginBottom: '10px' }}>
        <button onClick={() => handleMonthChange(-1)}>Previous Month</button>
        <h3 style={{ display: 'inline', margin: '0 10px' }}>
          {currentMonth.toLocaleDateString('default', { month: 'long', year: 'numeric' })}
        </h3>
        <button onClick={() => handleMonthChange(1)}>Next Month</button>
      </div>
      <table style={{ margin: 'auto' }}>
        <thead>
          <tr>
            <th>Sun</th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
            <th>Sat</th>
          </tr>
        </thead>
        <tbody>
          {generateCalendar().map((week, index) => (
            <tr key={index}>
              {week.map((day, index) => (
                <td
                  key={index}
                  onClick={() => handleDateClick(day)}
                  style={{ cursor: day !== null ? 'pointer' : 'default' }}
                >
                  {day !== null ? <span>{day}</span> : null}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {selectedDate && (
        <p>Selected Date: {selectedDate.toLocaleDateString()}</p>
      )}
    </div>
  );
};

export default DatePicker;
