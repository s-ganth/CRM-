import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input: React.FC<InputProps> = ({ label, id, ...props }) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-text-secondary mb-1">
        {label}
      </label>
      <input
        id={id}
        {...props}
        className="block w-full px-3 py-2 bg-input-bg border border-border rounded-md shadow-sm text-text placeholder-text-secondary focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
      />
    </div>
  );
};

export default Input;