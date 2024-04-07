import { ItemWithCategory } from '@/types/item';
import { ReactNode } from 'react';
import { CategoryBlock } from './category-block';

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
        <CategoryBlock name={item.category.name} />
        <div className="flex flex-col justify-center dark:text-white">
          <span>{item.name}</span>
          {!!amount && <span>Amount: {amount}</span>}
        </div>
      </div>
      {renderContent?.()}
    </div>
  );
};
