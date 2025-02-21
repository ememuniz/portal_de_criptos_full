import React from 'react';

const Input = ({ label, type, value, onChange, name, className }) => {
  return (
    <input type={type} value={value} onChange={onChange} name={name} className={className} required />
  );
};

export default Input;