import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

const Textarea: React.FC<TextareaProps> = ({ label, id, ...props }) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-text-secondary mb-1">
        {label}
      </label>
      <textarea
        id={id}
        {...props}
        rows={4}
        className="block w-full px-3 py-2 bg-input-bg border border-border rounded-md shadow-sm text-text placeholder-text-secondary focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
      />
    </div>
  );
};

export default Textarea;