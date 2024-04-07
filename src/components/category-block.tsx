import { getBgColorClassName } from '@/utils/color.utils';
import { getFirstLetter } from '@/utils/string.utils';

type Props = {
  name: string;
};

export const CategoryBlock = ({ name }: Props) => (
  <div
    className={`flex self-center items-center rounded py-2 px-4 border border-slate-500 ${getBgColorClassName(
      name
    )}`}
  >
    {getFirstLetter(name)}
  </div>
);
