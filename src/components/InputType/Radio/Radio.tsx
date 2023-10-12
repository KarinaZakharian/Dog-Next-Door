import { ChangeEvent } from 'react';

import './Radio.scss';

interface FieldProps {
  name: string;
  id: string | undefined;
  value: string;
  picked: string;
  img: string;
  label: string;
  onRadioChange: (value: string) => void;
}

function Radio({
  name,
  id,
  value,
  picked,
  img,
  label,
  onRadioChange,
}: FieldProps) {
  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    onRadioChange(event.target.value);
  }

  return (
    <div className="form__radio">
      <input
        type="radio"
        id={id}
        value={value}
        name={name}
        className="form__radio-input"
        checked={picked === value}
        onChange={handleChange}
      />
      <label htmlFor={id} className="form__radio-label small">
        <img className="form__icon" src={img} alt="hotel" />
        <span className="form__text">{label}</span>
      </label>
    </div>
  );
}

export default Radio;
