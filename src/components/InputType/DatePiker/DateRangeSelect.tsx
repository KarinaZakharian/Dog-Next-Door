import React, { useState } from 'react';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';

function DateRangeComp(start_date: string, end_date: string) {
  /* Set your desired start and end dates here */
  const startDate = new Date(start_date);
  const endDate = new Date(end_date);

  /* Create a date range object */
  const dateRange = [
    {
      startDate,
      endDate,
      key: 'selection',
    },
  ];

  /* Set the open state and handle interactions */
  const [open, setOpen] = useState(true);

  return (
    <div className="calendarWrap">
      <input
        name="disponibility_date"
        value={`${startDate.toLocaleDateString()} to ${endDate.toLocaleDateString()}`}
        readOnly
        className="inputBox"
      />

      <div>
        {open && (
          <DateRange
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
