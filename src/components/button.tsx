import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  onClick: () => void;
};

const Button = ({ children, onClick }: Props) => (
  <button className="border px-2 py-1 rounded" onClick={onClick}>
    {children}
  </button>
);

export default Button;
