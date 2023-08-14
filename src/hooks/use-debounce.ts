import { useEffect, useState } from 'react';

const useDebounce = (value: string, delay = 400) => {
  const [debouncedValue, setDebouncedValue] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);

    return () => clearTimeout(timer);
  }, [delay, value]);

  return debouncedValue;
};

export default useDebounce;
