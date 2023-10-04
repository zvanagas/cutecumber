import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  onClick: () => void;
  className?: string;
};

const Button = ({ children, className, onClick }: Props) => (
  <button
    className={`bg-white shadow-sm border px-2 py-1 rounded ${className}`}
    onClick={onClick}
  >
    {children}
  </button>
);

export default Button;
