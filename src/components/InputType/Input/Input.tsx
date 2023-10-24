import './Input.scss';

import { useState } from 'react';

interface InputProps {
  name: string;
  placeholder: string;
  [prop: string]: unknown;
}

function Input({ name, placeholder, ...props }: InputProps) {
  const [value, setValue] = useState(props.defaultValue || '');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    event.target.style.borderColor = 'initial';
  };

  return (
    <div className="input">
      <label htmlFor={name} className="input__label">
        {placeholder}
      </label>
      <input
        className="input__field"
        name={name}
        value={value}
        onChange={handleChange}
        {...props}
      />
    </div>
  );
}

export default Input;
