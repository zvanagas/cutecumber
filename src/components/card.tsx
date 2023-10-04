import { useRouter } from 'next/navigation';
import { ElementType } from 'react';

type Props = {
  link: string;
  label: string;
  Icon: ElementType;
};

const Card = ({ link, label, Icon }: Props) => {
  const router = useRouter();

  return (
    <div
      className="flex items-center justify-between w-full gap-2 p-4 cursor-pointer bg-white rounded text-black shadow-md"
      onClick={() => router.push(link)}
    >
      <span>{label}</span>
      <Icon className="w-14 h-14" />
    </div>
  );
};

export default Card;
