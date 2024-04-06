import { ItemWithCategory } from '@/types/item';
import { getBgColorClassName } from '@/utils/color.utils';
import { getFirstLetter } from '@/utils/string.utils';
import { ReactNode } from 'react';

type Props = {
  item: ItemWithCategory;
  amount?: number;
  className?: string;
  isDisabled?: boolean;
  onClick?: () => void;
  renderContent?: () => ReactNode;
};

export const ItemCard = ({
  item,
  amount,
  className,
  isDisabled,
  onClick,
  renderContent,
}: Props) => {
  const getClassNames = () => {
    let baseClasses =
      'shadow-sm p-2 flex w-full justify-between rounded border-slate-300 relative dark:bg-slate-800';

    if (isDisabled) {
      baseClasses += ' cursor-not-allowed';
    }

    return className ? `${baseClasses} ${className}` : baseClasses;
  };

  return (
    <div className={getClassNames()} onClick={() => !isDisabled && onClick?.()}>
      <div className="flex gap-2">
        <div
          className={`flex self-center items-center rounded py-2 px-4 border border-slate-500 ${getBgColorClassName(
            item.category.name
          )}`}
        >
          {getFirstLetter(item.category.name)}
        </div>
        <div className="flex flex-col justify-center dark:text-white">
          <span>{item.name}</span>
          {!!amount && <span>Amount: {amount}</span>}
        </div>
      </div>
      {renderContent?.()}
    </div>
  );
};
