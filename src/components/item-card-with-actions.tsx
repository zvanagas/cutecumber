import { ItemCard } from './item-card';
import { useEffect, useState } from 'react';
import { ItemWithCategory } from '@/types/item';
import { Button } from './button';
import { CloseIcon } from '@/icons/close.icon';

type Props = {
  item: ItemWithCategory;
  amount?: number;
  isDisabled?: boolean;
  onUpdate?: (amount: number) => void;
  onDelete?: () => void;
};

export const ItemCardWithActions = ({
  item,
  amount,
  isDisabled,
  onUpdate,
  onDelete,
}: Props) => {
  const [currAmount, setCurrAmount] = useState(1);

  useEffect(() => {
    if (amount) {
      setCurrAmount(amount);
    }
  }, [amount]);

  const renderContent = () => (
    <div className="flex flex-col justify-between items-end gap-6">
      {onDelete && (
        <button
          className="text-white border rounded-md dark:border-white/20 p-2 shadow-sm shadow-white"
          onClick={onDelete}
        >
          <CloseIcon className="w-5 h-5 text-white" />
        </button>
      )}
      {onUpdate && (
        <>
          <div className="flex text-xl gap-2">
            {amount !== currAmount && (
              <Button
                className="dark:border-white/20 px-3"
                onClick={() => onUpdate(currAmount)}
              >
                U
              </Button>
            )}
            <div className="flex">
              {currAmount > 1 && (
                <Button
                  className="px-3.5 dark:border-white/20"
                  onClick={() => setCurrAmount(currAmount - 1)}
                >
                  -
                </Button>
              )}
              <span className="flex items-center px-3 dark:text-white">
                {currAmount}
              </span>
              <Button
                className="px-3 border-white/20 shadow-none"
                onClick={() => setCurrAmount(currAmount + 1)}
              >
                +
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );

  return (
    <div className="relative w-full max-w-6xl">
      <ItemCard
        item={item}
        amount={amount}
        isDisabled={isDisabled}
        renderContent={() => !isDisabled && renderContent()}
      />
    </div>
  );
};
