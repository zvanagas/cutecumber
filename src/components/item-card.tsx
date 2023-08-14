import { ItemWithCategory } from "@/types/item";
import { ReactNode } from "react";

type Props = {
  item: ItemWithCategory;
  amount?: number;
  className?: string;
  isDisabled?: boolean;
  onClick?: () => void;
  renderContent?: () => ReactNode;
};

const ItemCard = ({
  item,
  amount,
  className,
  isDisabled,
  onClick,
  renderContent,
}: Props) => {
  const getClassNames = () => {
    let baseClasses =
      "shadow-sm p-2 flex justify-between rounded border border-slate-300 relative";

    if (isDisabled) {
      baseClasses += " cursor-not-allowed";
    }

    return className ? `${baseClasses} ${className}` : baseClasses;
  };

  const getFirstCategoryLetter = (name: string) => name.at(0);

  return (
    <div className={getClassNames()} onClick={() => !isDisabled && onClick?.()}>
      <div className="flex gap-2">
        <div className="flex self-center items-center rounded py-2 px-4 border border-slate-500">
          {getFirstCategoryLetter(item.category.name)}
        </div>
        <div className="flex flex-col justify-center">
          <span>{item.name}</span>
          {!!amount && <span>Amount: {amount}</span>}
        </div>
      </div>
      {renderContent?.()}
    </div>
  );
};

export default ItemCard;
