import { ReactNode } from 'react';
import CloseButton from './close-button';

type Props = {
  isOpen: boolean;
  children: ReactNode;
  onClose: () => void;
};

const Dialog = ({ isOpen, children, onClose }: Props) => (
  <dialog open={isOpen}>
    <div
      className="bg-transparent top-0 left-0 backdrop-blur-lg fixed w-full h-full"
      onClick={onClose}
    />
    <div className="bg-white dark:bg-slate-800 border rounded w-11/12 h-5/6 p-2 fixed inset-0 m-auto">
      <CloseButton className="absolute right-2" onClick={onClose} />
      {children}
    </div>
  </dialog>
);

export default Dialog;
