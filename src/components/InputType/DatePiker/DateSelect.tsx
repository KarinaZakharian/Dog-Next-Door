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

  const hideOnClickOutside = (e: MouseEvent) => {
    if (refOne.current && !refOne.current.contains(e.target as Element)) {
      setOpen(false);
    }
  };

  /* hide dropdown on ESC press */
  const hideOnEscape = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      setOpen(false);
    }
  };
  /* set carrent date on component Load */
  useEffect(() => {
    setCalendar(format(new Date(), 'dd/MM/yyyy'));
    document.addEventListener('click', hideOnClickOutside, true);
    document.removeEventListener('keydown', hideOnEscape, true);
  }, []);

  /* on date change, store date in store */
  const handleSelect = (date: number | Date) => {
    // Update the state with the selected date
    setCalendar(format(date, 'dd/MM/yyyy'));
    setOpen(false); // Close the calendar after selecting a date
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
