import { BackIcon } from '@/icons/back.icon';
import { Button } from './button';

type Props = {
  onClick: () => void;
  className?: string;
};

export const BackButton = ({ className, onClick }: Props) => (
  <Button className={`px-1 ${className}`} onClick={onClick}>
    <BackIcon />
  </Button>
);
