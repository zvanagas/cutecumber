import { ReactNode } from 'react';
import { CloseIcon } from '@/icons/close.icon';

type Props = {
  isOpen: boolean;
  children: ReactNode;
  onClose: () => void;
};

export const Dialog = ({ isOpen, children, onClose }: Props) => (
  <dialog open={isOpen}>
    <div
      className="bg-transparent top-0 left-0 backdrop-blur-lg fixed w-full h-full"
      onClick={onClose}
    />
    <div className="bg-white dark:bg-slate-800 border rounded w-11/12 h-5/6 p-2 fixed inset-0 m-auto overflow-auto">
      <CloseIcon
        className="absolute right-2 w-6 text-black cursor-pointer text-white"
        onClick={onClose}
      />
      {children}
    </div>
  </dialog>
);
