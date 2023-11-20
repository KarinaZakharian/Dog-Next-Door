import { ChangeEvent } from 'react';

import './RadioSimple.scss';

interface FieldProps {
  name: string;
  id: string | undefined;
  value: string;
  picked: string;
  onRadioChange: (value: string) => void;
  label: string | undefined;
}

function RadioSimple({
  name,
  id,
  value,
  picked,
  onRadioChange,
  label,
}: FieldProps) {
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
        {label}
      </label>
    </div>
  );
}

export default RadioSimple;
