import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  onClick: () => void;
  className?: string;
  isDisabled?: boolean;
};

export const Button = ({ children, className, isDisabled, onClick }: Props) => (
  <button
    className={`shadow-sm border px-2 py-1 rounded-md dark:text-white dark:shadow-white ${className}`}
    onClick={onClick}
    disabled={isDisabled}
  >
    {children}
  </button>
);
