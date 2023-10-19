import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';

interface Disponibility {
  id: number | null;
  start_date: string | null;
  end_date: string | null;
}
function DateRangeComp(disponibility: Disponibility) {
  const { start_date, end_date } = disponibility.disponibility;
  // console.log(start_date, end_date);
  /* Set your desired start and end dates here */
  const startDate = new Date(`${start_date}`);
  const endDate = new Date(`${end_date}`);

  /* Create a date range object */
  const dateRange = [
    {
      startDate,
      endDate,
      key: 'selection',
    },
  ];

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
