'use client';
import { useState } from 'react';

type Props = {
  items?: { name: string }[];
  value: string;
  onChange: (value: string) => void;
  onSelect: (value: string) => void;
};

const Autocomplete: React.FC<Props> = ({
  items,
  value,
  onChange,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handlerBlur = () => {
    setTimeout(() => setIsOpen(false), 100);
  };

  return (
    <div className="relative" onBlur={handlerBlur}>
      <input
        className="text-black z-10 relative w-30 h-8"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsOpen(true)}
      />
      {isOpen && (
        <div className="absolute top-0 text-black w-full">
          <ul className="mt-8 bg-white">
            {items?.map(({ name }) => (
              <li
                key={name}
                className="cursor-pointer"
                onClick={() => {
                  onSelect(name);
                  setIsOpen(false);
                }}
              >
                {name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Autocomplete;
