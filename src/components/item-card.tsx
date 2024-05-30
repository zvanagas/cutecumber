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
      'shadow-sm px-4 py-2 flex flex-col gap-2 w-28 justify-between self-start rounded border border-slate-300 relative dark:bg-slate-800';

    if (isDisabled) {
      baseClasses += ' cursor-not-allowed';
    }

    return className ? `${baseClasses} ${className}` : baseClasses;
  };

  return (
    <div className={getClassNames()}>
      <div
        className="flex flex-col items-center gap-2"
        onClick={() => !isDisabled && onClick?.()}
      >
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
