import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  onClick: () => void;
  className?: string;
  isDisabled?: boolean;
};

const Button = ({ children, className, isDisabled, onClick }: Props) => (
  <button
    className={`shadow-sm border px-2 py-1 rounded-md ${className}`}
    onClick={onClick}
    disabled={isDisabled}
  >
    {children}
  </button>
);

export default Button;
