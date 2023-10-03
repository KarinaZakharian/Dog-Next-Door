import { DateRangePicker } from 'react-date-range';
import format from 'date-fns/format';
import { addDays } from 'date-fns';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import './DatePicker.scss';
import { useEffect, useRef, useState } from 'react';

function DateRangePickerComp() {
  /* open close */
  const [open, setOpen] = useState(false);

  /* date state */
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection',
    },
  ]);

  /*  get the target element to toggle */
  const refOne = useRef(null);

  /* hide dropdown on ESC press */
  const hideOnEscape = (e) => {
    console.log(e.key);
    if (e.key === 'Enter') {
      setOpen(false);
    }
  };

  const hideOnClickOutside = (e) => {
    console.log(refOne.current);
    console.log(e.target);
    if (refOne.current && !refOne.current.contains(e.target)) {
      setOpen(false);
    }
  };
  /* set carrent date on component Load */
  useEffect(() => {
    document.addEventListener('keydown', hideOnEscape, true);
    document.addEventListener('click', hideOnClickOutside, true);
  }, []);

  return (
    <div className="calendarWrap">
      <p>Pour ces jours</p>
      <input
        name="date"
        value={`${format(range[0].startDate, ' dd/MM/YYY')} au ${format(
          range[0].endDate,
          'dd/MM/YYY'
        )}`}
        readOnly
        className="inputBox"
        onClick={() => setOpen((open) => !open)}
      />

      <div ref={refOne}>
        {open && (
          <DateRangePicker
            onChange={(item) => setRange([item.selection])}
            editableDateInputs={true}
            moveRangeOnFirstSelection={false}
            ranges={range}
            months={1}
            direction="horizontal"
            className="calendarElement"
          />
        )}
      </div>
    </div>
  );
}

export default DateRangePickerComp;
