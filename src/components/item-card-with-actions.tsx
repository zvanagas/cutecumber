import ItemCard from './item-card';
import { useEffect, useState } from 'react';
import { ItemWithCategory } from '@/types/item';
import CloseButton from './close-button';
import Button from './button';

type Props = {
  item: ItemWithCategory;
  amount?: number;
  isDisabled?: boolean;
  onUpdate?: (amount: number) => void;
  onDelete?: () => void;
};

const ItemCardWithActions = ({
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
      {onDelete && <CloseButton onClick={onDelete} />}
      {onUpdate && (
        <>
          <div className="flex text-xl gap-2">
            {amount !== currAmount && (
              <Button
                className="rounded-md"
                onClick={() => onUpdate(currAmount)}
              >
                U
              </Button>
            )}
            <div className="flex">
              {currAmount > 1 && (
                <Button
                  className="rounded-l-md bg-yellow-300"
                  onClick={() => setCurrAmount(currAmount - 1)}
                >
                  -
                </Button>
              )}
              <span
                className={`flex items-center px-2 border-y ${
                  currAmount < 2 && 'border-l rounded-l-md'
                }`}
              >
                {currAmount}
              </span>
              <Button
                className="px-2 rounded-r-md bg-green-300"
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

export default ItemCardWithActions;
