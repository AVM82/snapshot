import React from 'react';

interface InputProps {
  inputName:string
  rest:React.InputHTMLAttributes<HTMLInputElement>
}

function Input({ inputName, rest }:InputProps):React.JSX.Element {
  return (
    <label>
      <input {...rest} />
      <span>{inputName}</span>
    </label>
  );
}

export default Input;
