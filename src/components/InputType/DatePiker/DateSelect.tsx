import { Calendar } from 'react-date-range';
import format from 'date-fns/format';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { useEffect, useRef, useState } from 'react';

function CalendarComp() {
  /* open close */
  const [open, setOpen] = useState(false);

  /* date state */
  const [calendar, setCalendar] = useState('');

  /*  get the target element to toggle */
  const refOne = useRef(null);

  /* hide dropdown on ESC press */
  const hideOnEscape = (e) => {
    if (e.key === 'Enter') {
      setOpen(false);
    }
  };

  const hideOnClickOutside = (e) => {
    if (refOne.current && !refOne.current.contains(e.target)) {
      setOpen(false);
    }
  };
  /* set carrent date on component Load */
  useEffect(() => {
    setCalendar(format(new Date(), 'MM/dd/yyyy'));
    document.addEventListener('keydown', hideOnEscape, true);
    document.addEventListener('click', hideOnClickOutside, true);
  }, []);

  /* on date change, store date in store */
  const handleSelect = (date: number | Date) => {
    setCalendar(format(date, 'MM/dd/yyyy'));
  };

  return (
    <div className="calendarWrap">
      <p className="datapicker-title">Date de naissance</p>
      <input
        name="date_birth"
        value={calendar}
        readOnly
        className="inputBox"
        onClick={() => setOpen((open) => !open)}
      />

      <div ref={refOne}>
        {open && (
          <Calendar
            date={new Date()}
            onChange={handleSelect}
            className="calendarElement"
          />
        )}
      </div>
    </div>
  );
}

export default CalendarComp;
