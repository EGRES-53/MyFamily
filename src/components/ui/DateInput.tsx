import React, { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';

interface DateInputProps {
  label?: string;
  name: string;
  value: string; // Format YYYY-MM-DD
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  error?: string;
}

const DateInput: React.FC<DateInputProps> = ({
  label,
  name,
  value,
  onChange,
  required,
  error
}) => {
  const [inputValue, setInputValue] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);

  // Convertit YYYY-MM-DD vers JJ/MM/AAAA
  useEffect(() => {
if (value && value.match(/^\d{4}-\d{2}-\d{2}$/)) {
      const [year, month, day] = value.split('-');
      setInputValue(`${day}/${month}/${year}`);
    }
  }, [value]);

  const handleTextInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value.replace(/[^\d]/g, '');
    
    // Formate automatiquement JJ/MM/AAAA
    if (input.length >= 2) {
      input = input.slice(0, 2) + '/' + input.slice(2);
    }
    if (input.length >= 5) {
      input = input.slice(0, 5) + '/' + input.slice(5, 9);
    }
    
    setInputValue(input);

    // Valide et convertit en YYYY-MM-DD
    if (input.length === 10) {
      const [day, month, year] = input.split('/');
      if (isValidDate(day, month, year)) {
        const isoDate = `${year}-${month}-${day}`;
        onChange({
          ...e,
          target: { ...e.target, name, value: isoDate }
        });
      }
    }
  };

  const isValidDate = (day: string, month: string, year: string) => {
    const d = parseInt(day);
    const m = parseInt(month);
    const y = parseInt(year);
    return d >= 1 && d <= 31 && m >= 1 && m <= 12 && y >= 1900 && y <= 2100;
  };

  const handleCalendarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
    setShowCalendar(false);
  };

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-neutral-700 mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      
      <div className="relative">
        {/* Saisie manuelle */}
        <input
          type="text"
          value={inputValue}
          onChange={handleTextInput}
          placeholder="JJ/MM/AAAA"
          maxLength={10}
          className={`w-full px-3 py-2 pr-10 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 ${
            error ? 'border-red-300' : 'border-neutral-300'
          }`}
          required={required}
        />
        
        {/* Bouton calendrier */}
        <button
          type="button"
          onClick={() => setShowCalendar(!showCalendar)}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-400 hover:text-primary-600"
        >
          <Calendar size={18} />
        </button>

        {/* Sélecteur natif caché */}
        {showCalendar && (
          <input
            type="date"
            name={name}
            value={value}
            onChange={handleCalendarChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            required={required}
          />
        )}
      </div>
      
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default DateInput;
