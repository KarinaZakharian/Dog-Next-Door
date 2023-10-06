/* eslint-disable prettier/prettier */
import './Textarea.scss';

import { useState } from 'react';

interface InputProps {
  // je dois avoir une _prop_ `name` : une chaîne de caractères
  label: string;
  placeholder: string;
  name: string;
}

function TextareaInput({ name, label, placeholder }: InputProps) {
  const [value, setValue] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <div className="input">
      <label htmlFor={name} className="input__label">
        {label}
      </label>
      <textarea
        className="input__field"
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        rows="5"
        cols="33"
      />
    </div>
  );
}

export default TextareaInput;
