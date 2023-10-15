import React, { useState } from 'react';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';

function DateRangeComp(disponibility) {
  console.log(disponibility);
  const start = disponibility.disponibility.start_date;
  const end = disponibility.disponibility.end_date;
  console.log(start, end);
  /* Set your desired start and end dates here */
  const startDate = new Date(`${start}`);
  const endDate = new Date(`${end}`);

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

  // Empty onChange function to block interactions
  const handleDateRangeChange = () => {};

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
            onChange={handleDateRangeChange} // Provide the empty function
          />
        )}
      </div>
    </div>
  );
}

export default DateRangeComp;
