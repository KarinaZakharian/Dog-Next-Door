/* eslint-disable prettier/prettier */
/*We have to check value in the cmponent where function is used
const [picked, setPicked] = useState('');
  function handleRadioChange(value: string): void {
    setPicked(value);
  }*/

import { ChangeEvent } from 'react';

import './RadioSimple.scss';

interface FieldProps {
  name: string;
  id: string | undefined;
  value: string;
  picked: string;
  onRadioChange: (value: string) => void;
}

function Radio({ name, id, value, picked, onRadioChange }: FieldProps) {
  console.log(picked);

  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    onRadioChange(event.target.value);
  }

  return (
    <div className="radio-simple">
      <input
        type="radio"
        id={id}
        value={value}
        name={name}
        className="radio-input"
        checked={picked === value}
        onChange={handleChange}
      />
      <label htmlFor={id} className="radio-label">
        {value}
      </label>
    </div>
  );
}

// == Export
export default Radio;
