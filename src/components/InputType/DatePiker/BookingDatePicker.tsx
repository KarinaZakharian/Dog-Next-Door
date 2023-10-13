import { DateRangePicker } from 'react-date-range';
import format from 'date-fns/format';
import { addDays } from 'date-fns';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import './DatePicker.scss';
import { useEffect, useRef, useState } from 'react';
interface InputProps {
  minDate: Date;
  maxDate: Date;
}
function BookingRangePickerComp({ minDate, maxDate }: InputProps) {
  /* open close */
  const [open, setOpen] = useState(false);

  /* date state */
  const [state, setState] = useState({
    selection: {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  });

  /*  get the target element to toggle */
  const refOne = useRef(null);

  /* hide dropdown on ESC press */
  const hideOnEscape = (e) => {
    // console.log(e.key);
    if (e.key === 'Enter') {
      setOpen(false);
    }
  };

  const hideOnClickOutside = (e) => {
    // console.log(refOne.current);
    // console.log(e.target);
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
      <input
        name="disponibility_date"
        value={`${format(state.selection.startDate, ' dd/MM/YYY')} au ${format(
          state.selection.endDate,
          'dd/MM/YYY'
        )}`}
        readOnly
        className="inputBox"
        onClick={() => setOpen((open) => !open)}
      />

      <div ref={refOne}>
        {open && (
          <DateRangePicker
            onChange={(item) => setState({ ...state, ...item })}
           
            editableDateInputs={true}
            moveRangeOnFirstSelection={false}
            months={1}
            preventSnapRefocus={true}
            calendarFocus="backwards"
            direction="horizontal"
            className="calendarElement"
            ranges={[state.selection]}
          />
        )}
      </div>
    </div>
  );
}

export default BookingRangePickerComp;
