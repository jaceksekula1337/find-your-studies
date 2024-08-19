import React from 'react';

export default function FormInput({ type, label, options, name, value, onChange }) {
  return (
    <div className="mb-4">
      <label className="block font-semibold mb-2">{label}</label>
      {type === 'radio' && options.map((option, index) => (
        <div key={index}>
          <input
            type="radio"
            id={`${name}-${index}`}
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={onChange}
            className="mr-2"
          />
          <label htmlFor={`${name}-${index}`}>{option.label}</label>
        </div>
      ))}
      {type === 'select' && (
        <select name={name} value={value} onChange={onChange} className="border rounded p-2 w-full">
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )}
      {type === 'checkbox' && options.map((option, index) => (
        <div key={index}>
          <input
            type="checkbox"
            id={`${name}-${index}`}
            name={name}
            value={option.value}
            checked={value.includes(option.value)}
            onChange={onChange}
            className="mr-2"
          />
          <label htmlFor={`${name}-${index}`}>{option.label}</label>
        </div>
      ))}
      {type === 'text' && (
        <input
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          className="border rounded p-2 w-full"
        />
      )}
    </div>
  );
}
