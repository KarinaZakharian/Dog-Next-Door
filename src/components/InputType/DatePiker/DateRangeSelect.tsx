import React, { useState } from 'react';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';

function DateRangeComp() {
  /* Set your desired start and end dates here */
  const startDate = new Date('2023-01-01');
  const endDate = new Date('2023-01-15');

  /* Create a date range object */
  const dateRange = [
    {
      startDate,
      endDate,
      key: 'selection',
    },
  ];

  /* Set the open state and handle interactions */
  const [open, setOpen] = useState(false);

  const toggleCalendar = () => {
    setOpen(!open);
  };

  const handleDateChange = (item) => {
    // Do nothing when the user tries to change the dates
  };

  return (
    <div className="calendarWrap">
      <input
        value={`${startDate.toLocaleDateString()} to ${endDate.toLocaleDateString()}`}
        readOnly
        className="inputBox"
        onClick={toggleCalendar}
      />

      <div>
        {open && (
          <DateRange
            onChange={handleDateChange}
            editableDateInputs={false}
            moveRangeOnFirstSelection={false}
            ranges={dateRange}
            months={1}
            direction="horizontal"
            className="calendarElement"
          />
        )}
      </div>
    </div>
  );
}

export default DateRangeComp;
