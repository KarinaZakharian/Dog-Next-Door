/* eslint-disable prettier/prettier */

import './Input.scss';

import { useState } from 'react';

interface InputProps {
  // je dois avoir une _prop_ `name` : une chaîne de caractères
  name: string;
  placeholder: string;

  // je peux avoir plein d'autres _props_ à condition
  // que le nom de la _prop_ soit un `string` ;
  // je connais pas d'avance le type de la valeur
  // (style={{ color: red }}, checked={true}, className="my-class"…)
  [prop: string]: unknown;
}

/*
  dans l'objet props :
  - on oblige `name` en décomposant et affectant
  - le reste est optionnel et on ne sait pas à quoi ça ressemble
    → Rest operator `...others`

  > https://javascript.info/rest-parameters-spread
  > https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
*/
function Input({ name, placeholder, ...props }: InputProps) {
  const [value, setValue] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    event.target.style.borderColor = 'initial';
  };

  console.log(name, value);

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
