import { useState } from 'react';
import { naturalSort } from '../helpers/naturalSort';

interface DropdownProps {
  dropdownOptions: string[];
  onOptionSelect: (option: string) => void;
}

export const Dropdown: React.FC<DropdownProps> = ({ dropdownOptions = [], onOptionSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [options] = useState<string[]>(dropdownOptions);

  const filteredOptions = options
    .filter((option) => option.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort(naturalSort);

  return (
    <div className="relative mt-4 w-64">
      <div className="relative">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-lg border py-2 pl-3 pr-10 shadow-sm focus:border-blue-300 focus:outline-none focus:ring"
          onClick={() => setIsOpen(true)}
        />
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="absolute right-0 top-0 text-gray-400 hover:text-gray-600 focus:outline-none"
        >
          <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
      {isOpen && (
        <div className="absolute z-10 mt-2 w-full rounded-lg border bg-white shadow-lg">
          <ul className="max-h-40 overflow-y-auto">
            {filteredOptions.map((option, index) => (
              <li
                key={index}
                className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                onClick={() => {
                  setSearchTerm(option);
                  setIsOpen(false);
                  onOptionSelect(option);
                }}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
