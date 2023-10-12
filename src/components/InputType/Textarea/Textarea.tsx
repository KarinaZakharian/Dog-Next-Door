import './Textarea.scss';
import { useState, ChangeEventHandler } from 'react';

interface InputProps {
  label: string;
  placeholder: string;
  name: string;
  rows: number;
  cols: number;
}

function TextareaInput({ name, label, placeholder }: InputProps) {
  const [value, setValue] = useState('');

  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
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
        rows={5}
        cols={33}
      />
    </div>
  );
}

export default TextareaInput;
