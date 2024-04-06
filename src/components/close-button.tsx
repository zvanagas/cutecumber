import { CloseIcon } from '@/icons/close.icon';
import { Button } from './button';

type Props = {
  onClick: () => void;
  className?: string;
};

export const CloseButton = ({ className, onClick }: Props) => (
  <Button className={`py-2 ${className}`} onClick={onClick}>
    <CloseIcon />
  </Button>
);
