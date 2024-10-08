import React from 'react';

interface CategorySelectProps {
  label: string;
  options: string[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const CategorySelect = ({ label, options, value, onChange }: CategorySelectProps) => {
  return (
    <div className="w-full">
      <div className="relative">
        <select
          value={value}
          onChange={onChange}
          className="block w-full px-3 py-3 bg-white border border-gray-300 rounded-md shadow-sm
            text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
            text-base appearance-none"
        >
          <option value="">{label}</option>
          {options.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default CategorySelect;