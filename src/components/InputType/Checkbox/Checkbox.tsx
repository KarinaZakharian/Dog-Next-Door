/* eslint-disable prettier/prettier */
import { useState, useEffect } from 'react';
import './Checkbox.scss';

interface CheckboxGroupProps {
  name: string;
  options: string[];
  legend: string;
  onSelectionChange: (selectedOptions: string[]) => void;
}

function CheckboxGroup({
  name,
  options,
  legend,
  onSelectionChange,
}: CheckboxGroupProps) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  useEffect(() => {
    onSelectionChange(selectedOptions);
  }, []);

  const handleCheckboxChange = (option: string) => {
    if (selectedOptions.includes(option)) {
      // If the option is already selected, remove it from the array
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      // If the option is not selected, add it to the array
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  return (
    <div className="checkbox-wrap">
      <legend className="checkbox-title">{legend}</legend>
      {options.map((option) => (
        <label key={option} className="container">
          <input
            name={name}
            className="checkbox"
            type="checkbox"
            value={selectedOptions}
            checked={selectedOptions.includes(option)}
            onChange={() => handleCheckboxChange(option)}
          />
          <span className="checkmark" />
          {option}
        </label>
      ))}
    </div>
  );
}

export default CheckboxGroup;
