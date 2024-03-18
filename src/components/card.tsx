import { useRouter } from 'next/navigation';
import { ElementType } from 'react';

type Props = {
  link: string;
  label: string;
  Icon: ElementType;
  isDisabled?: boolean;
};

const Card = ({ link, label, Icon, isDisabled }: Props) => {
  const router = useRouter();

  return (
    <div
      className={`flex items-center justify-between w-full gap-2 p-4  bg-white dark:bg-slate-800 rounded text-black dark:text-white shadow-sm dark:shadow-white ${
        isDisabled ? 'cursor-not-allowed opacity-40' : 'cursor-pointer'
      }`}
      onClick={() => !isDisabled && router.push(link)}
    >
      <span>{label}</span>
      <Icon className="w-14 h-14" />
    </div>
  );
};

export default Card;
