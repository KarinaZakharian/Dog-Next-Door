import { useState } from 'react';
import './Checkbox.scss';

interface CheckboxGroupProps {
  options: string[];
  legend: string;
}

function CheckboxGroup({ options, legend }: CheckboxGroupProps) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  console.log(selectedOptions);

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
            className="checkbox"
            type="checkbox"
            value={option}
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
