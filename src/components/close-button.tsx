import { CloseIcon } from '@/icons/close.icon';
import Button from './button';

type Props = {
  onClick: () => void;
  className?: string;
};

const CloseButton = ({ className, onClick }: Props) => (
  <Button className={`px-0 py-0 ${className}`} onClick={onClick}>
    <CloseIcon />
  </Button>
);

export default CloseButton;
