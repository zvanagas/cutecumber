import ItemCard from './item-card';
import { useEffect, useState } from 'react';
import CloseIcon from '@/icons/close.icon';
import { ItemWithCategory } from '@/types/item';

type Props = {
  item: ItemWithCategory;
  amount?: number;
  isDisabled?: boolean;
  onUpdate?: (amount: number) => void;
  onDelete?: () => void;
};

const ItemCardWithAmount = ({
  item,
  amount = 1,
  isDisabled,
  onUpdate,
  onDelete,
}: Props) => {
  const [currAmount, setCurrAmount] = useState(amount);

  useEffect(() => {
    setCurrAmount(amount);
  }, [amount]);

  const renderContent = () => (
    <div className="flex flex-col justify-between items-end gap-6">
      {onDelete && (
        <button className="" onClick={onDelete}>
          <CloseIcon />
        </button>
      )}
      {onUpdate && (
        <>
          <div className="flex text-xl gap-2">
            {amount !== currAmount && (
              <button
                className="border-slate-300 border rounded-md px-2"
                onClick={() => onUpdate(currAmount)}
              >
                U
              </button>
            )}
            <div className="flex">
              {currAmount > 1 && (
                <button
                  className="border-slate-300 border rounded-l-md px-2"
                  onClick={() => setCurrAmount(currAmount - 1)}
                >
                  -
                </button>
              )}
              <span
                className={`px-2 border-y border-slate-300 ${
                  currAmount < 2 && 'border-l rounded-l-md'
                }`}
              >
                {currAmount}
              </span>
              <button
                className={`border border-slate-300 px-2 rounded-r-md`}
                onClick={() => setCurrAmount(currAmount + 1)}
              >
                +
              </button>
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

export default ItemCardWithAmount;
