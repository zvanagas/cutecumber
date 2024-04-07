'use client';
import { trpc } from '@/client/trpc';
import { ItemCardWithActions } from '@/components/item-card-with-actions';
import { ItemWithCategory } from '@/types/item';
import { Button } from '../button';
import { CartItem, SaveParams } from './interfaces/items';
import { useState } from 'react';
import { Categories } from '../categories';

type Props = {
  itemsInCart?: CartItem[];
  isBasketMode?: boolean;
  onSave?: (items: SaveParams) => void;
};

export const Items = ({ itemsInCart, isBasketMode, onSave }: Props) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [categoryId, setCategoryId] = useState<number>();
  const { data: categories } = trpc.categories.getAll.useQuery();
  const { data, isLoading } = trpc.items.getAll.useQuery({
    q: '',
    categoryId,
  });
  const itemIds = items.reduce<Record<number, boolean>>((prev, curr) => {
    if (curr.item.id) {
      prev[curr.item.id] = true;
    }

    return prev;
  }, {});

  const filteredItems = data?.filter(({ id }) => !itemIds[id]) ?? [];

  const addToBasket = (item: ItemWithCategory, amount: number) => {
    setItems([...items, { item, amount }]);
  };

  const removeFromBasket = (itemId: number) => {
    setItems((items) => items.filter((item) => item.item.id !== itemId));
  };

  const save = () => {
    const itemsToSave = items.map((item) => ({
      itemId: item.item.id,
      amount: item.amount,
    }));
    onSave?.({ items: itemsToSave });

    setItems([]);
  };

  return (
    <div className="flex w-full flex-col gap-4 items-center px-4">
      <span className="dark:text-white">Items</span>
      <Categories
        categories={categories}
        categoryId={categoryId}
        onCategoryClick={setCategoryId}
      />
      <div className="flex flex-col items-center w-full gap-2">
        {isLoading && <div className="dark:text-white">Loading...</div>}
        {!isLoading && !filteredItems.length && (
          <div className="dark:text-white">No items...</div>
        )}
        {!isLoading &&
          filteredItems?.map((item) => (
            <ItemCardWithActions
              key={item.name}
              item={item}
              isDisabled={itemsInCart?.some(
                (itemInCart) => itemInCart.item.id === item.id
              )}
              onUpdate={
                isBasketMode ? (amount) => addToBasket(item, amount) : undefined
              }
            />
          ))}
      </div>
      {items.length > 0 && (
        <div className="flex flex-col gap-2 justify-center items-center w-full">
          <span className="dark:text-white">Added items</span>
          {items.map((item) => (
            <ItemCardWithActions
              key={item.item.id}
              item={item.item}
              amount={item.amount}
              onDelete={() => removeFromBasket(item.item.id)}
            />
          ))}
          <Button
            className="bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300"
            onClick={save}
          >
            Save
          </Button>
        </div>
      )}
    </div>
  );
};
