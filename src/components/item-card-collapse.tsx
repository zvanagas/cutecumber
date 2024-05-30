import { ItemWithCategory } from '@/types/item';
import { ItemCard } from './item-card';
import { useEffect, useState } from 'react';
import { Button } from './button';

type Props = {
  item: ItemWithCategory;
  amount?: number;
  isNew?: boolean;
  onSave?: (id: number, amount: number) => void;
  onDelete?: (id: number) => void;
};

export const ItemCardCollapse = ({
  item,
  isNew,
  amount = 1,
  onSave,
  onDelete,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [itemAmount, setItemAmount] = useState(amount);

  useEffect(() => {
    setItemAmount(amount);
  }, [amount]);

  const renderContent = () => {
    if (!isOpen) {
      return null;
    }

    return (
      <div className="flex flex-col justify-center gap-4">
        <div className="flex justify-between text-white">
          <button
            disabled={itemAmount <= 1}
            onClick={() => setItemAmount(itemAmount - 1)}
          >
            -
          </button>
          <span>{itemAmount}</span>
          <button onClick={() => setItemAmount(itemAmount + 1)}>+</button>
        </div>
        <Button onClick={() => onSave?.(item.id, itemAmount)}>
          {isNew ? 'Add' : 'Update'}
        </Button>
        {onDelete && (
          <Button onClick={() => onDelete?.(item.id)}>Delete</Button>
        )}
      </div>
    );
  };

  return (
    <ItemCard
      item={item}
      renderContent={renderContent}
      className="cursor-pointer"
      onClick={() => setIsOpen(!isOpen)}
    />
  );
};
