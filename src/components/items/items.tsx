'use client';
import { trpc } from '@/client/trpc';
import { CartItem, SaveParams } from './interfaces/items';
import { useState } from 'react';
import { ItemCardCollapse } from '../item-card-collapse';

type Props = {
  itemsInCart?: CartItem[];
  isBasketMode?: boolean;
  onSave?: (items: SaveParams) => void;
};

export const Items = ({ itemsInCart, onSave }: Props) => {
  const [categoryId, setCategoryId] = useState<number>();
  const { data: categories } = trpc.categories.getAll.useQuery();
  const { data, isLoading } = trpc.items.getAll.useQuery({
    q: '',
    categoryId,
  });
  const itemIds =
    itemsInCart?.reduce<Record<number, boolean>>((prev, curr) => {
      if (curr.item.id) {
        prev[curr.item.id] = true;
      }

      return prev;
    }, {}) ?? {};

  const filteredItems = data?.filter(({ id }) => !itemIds[id]) ?? [];

  return (
    <div className="flex w-full flex-col gap-4 items-center">
      <span className="dark:text-white">Items</span>
      <select
        onChange={({ target }) =>
          setCategoryId(target.value ? Number(target.value) : undefined)
        }
      >
        <option value="">All</option>
        {categories?.map(({ id, name }) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
      </select>
      <div className="flex flex-col items-center w-full gap-2">
        {isLoading && <div className="dark:text-white">Loading...</div>}
        {!isLoading && !filteredItems.length && (
          <div className="dark:text-white">No items...</div>
        )}
        <div className="flex flex-wrap gap-2 justify-center">
          {filteredItems?.map((item) => (
            <ItemCardCollapse
              isNew
              key={item.id}
              item={item}
              onSave={(itemId, amount) =>
                onSave?.({ items: [{ itemId, amount }] })
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};
