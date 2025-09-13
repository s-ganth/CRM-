import React, { useState, useRef, useEffect } from 'react';
import { ChevronDownIcon } from '../icons';

export interface SelectOption {
    value: string | number;
    label: string;
}

interface SelectProps {
    label: string;
    options: SelectOption[];
    value: string | number | undefined;
    onChange: (value: string | number) => void;
    id?: string;
}

const Select: React.FC<SelectProps> = ({ label, id, options, value, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const selectedOption = options.find(option => option.value === value);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSelect = (option: SelectOption) => {
        onChange(option.value);
        setIsOpen(false);
    };

    return (
        <div className="relative" ref={ref}>
             {label && <label htmlFor={id} className="block text-sm font-medium text-text-secondary mb-1">
                {label}
            </label>}
            <button
                type="button"
                id={id}
                onClick={() => setIsOpen(!isOpen)}
                className="relative w-full bg-input-bg border border-border rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm"
                aria-haspopup="listbox"
                aria-expanded={isOpen}
            >
                <span className="block truncate text-text">{selectedOption ? selectedOption.label : 'Select...'}</span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                </span>
            </button>

            {isOpen && (
                <ul
                    className="absolute z-50 mt-1 w-full bg-card shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-border overflow-auto focus:outline-none sm:text-sm"
                    tabIndex={-1}
                    role="listbox"
                >
                    {options.map(option => (
                        <li
                            key={option.value}
                            onClick={() => handleSelect(option)}
                            className="text-text-secondary cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-background hover:text-text"
                            role="option"
                            aria-selected={value === option.value}
                        >
                            <span className={`block truncate ${value === option.value ? 'font-semibold text-text' : 'font-normal'}`}>
                                {option.label}
                            </span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Select;